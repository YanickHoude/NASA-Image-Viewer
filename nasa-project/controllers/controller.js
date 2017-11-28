// Bring in an instance of mongojs, a node module downloaded with npm
const mongojs = require('mongojs'); 
const http = require('request');


// This is technically a global variable for this file
var db = mongojs('mongodb://admin:webtechlab5@ds113746.mlab.com:13746/nasa');

//NASA API CALLS

module.exports.getImages = function (req, res){

    var options = { 
        method: 'GET',
        
    };
        
        http(options, function (error, response, body) {
          if(error){
              console.log("error still")
          }else{
             // console.log("Workjing appearently")
            //console.log(body);
            
            res.send((body))
          }
          
    });


}


// Search by a word entered in the front 
module.exports.searchQuery = function(req, res){
    
    // Extract the word entered in the search bar
    console.log("Confirming we are extracting right word: " + JSON.stringify((req.body)))
    
    
    var searchWord = req.body.property
    
    var options = {
        method: 'GET', 
        url: 'https://images-api.nasa.gov/search?q=' + searchWord
    };
        
      http(options, function (error, response, body) {
          if(error){
              console.log("error still")
          }else{
              //console.log("Workjing appearently")
            //console.log(body);
            
            res.send((body))
          }
          
    });

}




// Backend function for inserting an item
module.exports.insertUser = function (req, res){

  // Extract information from request
  var myNewItem = req.body.item

  db['users'].save({"user": myNewItem}, function(){ // The object id is stored in the database. Task is changed to singular to only grab 1 object.

     // After saving to the database, make a get call for all tweets
     db['user'].find(function(err, user){ // function takes an err and tasks
      if(err){ // check for an error
          res.send(err); //send the error if there is one.
      }
      
        //if no error, all the tweets in the json object they come in
        res.send(user)
    })
  })

}
  

// Perform any background functions and work here 
module.exports.deleteUser = function (req, res){

  //Extract inforation from request object
  var deleteItem = req.body.item

  db['users'].remove({"user": deleteItem}, function(){ // The object id is stored in the database. Task is changed to singular to only grab 1 object.
    
         // After saving to the database, make a get call for all tweets
         db['users'].find(function(err, user){ // function takes an err and tasks
          if(err){ // check for an error
              res.send(err); //send the error if there is one.
          }
          
            //if no error, all the tweets in the json object they come in
            res.send(user)
        })
      })
}

