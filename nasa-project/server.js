//server.js

//importing all packages
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const bcrypt = require('bcrypt')
const cors = require('cors');
const app = express()
app.use(cors())//stop that stupid header error

// configure app to use bodyParser
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//adding URI for mongodb
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/users', {
    useMongoClient: true,
});

//adding schemas
var User = require('./nasa-app/models/users');
var Collection = require('./nasa-app/models/collections');

//set the port
var port = 8081;

//========================================================================================
// Routes for API
//========================================================================================
var router = express.Router()

//middleware for all requests
router.use(function(req,res,next){
    console.log('something be happening');
    next();
});

//test route to make sure things work
router.get('/', function(req,res){
    res.json({message: "Hello!"});
});

//++++++++++++++++++++
// user
//++++++++++++++++++++
router.route('/user')

    .post(function(req,res){
        var user = new User();
        user.email = req.body.email;
        
        //hash that password baby
        user.hash = bcrypt.hashSync(req.body.password,10);
        
        user.save(function(err){
            if(err){
                res.send(err);
            }
        
            res.json({message: 'User Created'});
        });
        
    })

    .get(function(req,res){
        
        User.find(function(err,users){
            if(err){
                res.send(err);
            }
            
            res.json(users);
        });
    });


//++++++++++++++++++++
// login
//++++++++++++++++++++
router.route('/login')

    .post(function(req,res){
        
        User.findOne({'email':req.body.email}, function(err, user){
            
            if(err){
                res.send(err);
            }
        
            if(bcrypt.compareSync(req.body.password,user.hash)){
                res.json(user);
            }
            else{
                res.send("No m8");
            }
        });
    });

//++++++++++++++++++++
// collections
//++++++++++++++++++++
router.route('/collections')

    .post(function(req,res){
        var collection = new Collection();
        collection.user = req.body.user;
        collection.title = req.body.title;
        collection.description = req.body.description;
        collection.private = req.body.private;
        
        collection.save(function(err){
            if(err){
                res.send(err);
            }
        
            res.json({message: 'Collection Created'});
        });
    })
    
    .get(function(req,res){
        
        Collection.find(function(err,collection){
            if(err){
                res.send(err);
            }
            
            res.json(collection);
        });
    })

    .delete(function(req, res) {
        Collection.remove(
            function(err, comments) {
            if (err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted comments' });
        });
    });
    
app.use('/api', router);

app.listen(port);

console.log('Server is running on port ' + port);



// const api = require('./routes/routes')

// // Parsers
// app.use(require('cookie-parser')())
// app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
// app.use(bodyParser.json());                                     // parse application/json
// app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// // Angular DIST output folder
// app.use(express.static(path.join(__dirname, './nasa-app/dist')));

// // API Location
// app.use('/api', api)

// // Send all other requests to Angular App
// app.get('*', (req,res) => {
//  res.sendFile(path.join(__dirname, './nasa-app/dist/index.html'));
// });


// //declaring port to listen on
// const port = process.env.PORT || 8080;
// app.set('port',port);

// //listen to app on specified port
// app.listen(port)
// console.log("listening on port: " + port)

// //export app so it can be use anywhere
// module.exports = app

