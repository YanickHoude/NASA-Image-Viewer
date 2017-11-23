// Bring in an instance of mongojs, a node module downloaded with npm
const mongojs = require('mongojs'); 
const http = require('request');


// This is technically a global variable for this file
var db = mongojs('mongodb://admin:webtechlab5@ds113746.mlab.com:13746/nasa');

// Backend function for getting items
module.exports.getImages = function (req, res){

/*
  
   http('https://images-api.nasa.gov/search', function (error, response, body) {
     
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body);
    
    res.send(body)
  });
  
  */
  /*
  var requestObj = { 
      
      
          method: 'POST',
          url: 'https://images-api.nasa.gov/search',
          headers: 
           { 
             'content-type': 'application/json' 
               
           },
          body: { 
              q: 'apollo 11'
          },
          json: true 
      
        };
          
          
        
        http(requestObj, function (error, response, body) {
            
          if (error){
              console.log("There is an error")
              res.send(error)
          }else{
              console.log("Sending this body: " + JSON.stringify((body)))
             res.send(body)
          }
        });
        
        
        var options = { method: 'GET',
          url: 'https://images-api.nasa.gov/asset/AFRC2017-0302-096',
          headers: 
           { 
             'content-type': 'application/x-www-form-urlencoded'
             },
          form: { q: 'apollo' } 
            
        };
        */
        
        
    var options = { 
        method: 'GET',
        url: 'https://images-api.nasa.gov/asset/AFRC2017-0302-096'
        
    };
        
        http(options, function (error, response, body) {
          if(error){
              console.log("error still")
          }else{
              console.log("Workjing appearently")
            console.log(body);
            
            res.send((body))
          }
          
    });


}

// //test
// module.exports.test = function(req,res){
    
//     var teststring = "Is Working";
//     res.send(teststring)
// }


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


