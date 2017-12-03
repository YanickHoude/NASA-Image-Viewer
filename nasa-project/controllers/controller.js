// Bring in an instance of mongojs, a node module downloaded with npm
const http = require('request');


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
            
            res.send((body))
          }
          
    });

}


