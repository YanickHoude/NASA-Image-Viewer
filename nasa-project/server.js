//server.js

//importing all packages
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const bcrypt = require('bcrypt')
const cors = require('cors');
const nodemailer = require('nodemailer')
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
// email confirmation
//++++++++++++++++++++

router.route('/user/:user_id')

    .get(function(req,res){
        
        console.log('sanity')
        
                    
        console.log("params:" + req.params.user_id);
            
        //getting all the users created in the database
        User.findById(req.params.user_id, function(err,user){
            
            console.log("user:" + user._id);
            
            if(err){
                res.send(err);
            }
            
            user.active = true;
            
            user.save(function(err){
                if(err){
                    res.send(err)
                }
                
                res.json({messsage: 'Succesfully verified account'});
            })
        });
    })
    
    .delete(function(req,res){
        
        console.log('sanity1: ' + req.params.user_id);
        User.remove({_id: req.params.user_id}, function(err,user){
            
            if(err){
                res.send(err);
            }
            
            res.json({message: "Successfully deleted user"});
        });
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
        
        //email confirmation 
        user.active = false;
        user.activeHash = bcrypt.hashSync(req.body.email,10);
        
        console.log(user._id);
        
        console.log(user.activeHash);
        const confirmationLink = 'https://lab5-yanickhoude.c9users.io:8081/api/user/' + user._id;
        const emailContent = "<a href="+confirmationLink+">link text</a><p>" + confirmationLink +"</p>";
        
        console.log(emailContent);
        
        //nodemailer implementation
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: '250796261lab5@gmail.com', // generated ethereal user
                pass: '250796261'  // generated ethereal password
            }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"N(ice) ASA" <250796261lab5@gmail.com>', // sender address
            to: user.email, // list of receivers
            subject: 'Email Confirmation ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: emailContent // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
        
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
    })
    
    .delete(function(req, res) {
        User.remove(
            function(err, users) {
            if (err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted users' });
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


// ++++++++++++++++++++
// collections
// ++++++++++++++++++++
    
router.route('/collections/:collection_id')

        
    .get(function(req,res){
        
        console.log(req.params.collection_id);
        Collection.findById(req.params.collection_id, function(err,collection){
            if(err){
                res.send(err);
            }
            
            res.json(collection);
        })
    })
    
    .put(function(req,res){
        
        console.log(req.params.collection_id);
        
        Collection.findById(req.params.collection_id, function(err,collection){
            
            if (err){
               res.send(err);
            }
            
            collection.title = req.body.title;
            collection.description = req.body.description;
            collection.private = req.body.private;
            
            collection.save(function(err){
                if(err){
                    res.send(err)
                }
                
                res.json({messsage: 'Successfully updated collection'})
            })
        })
    })
    
    .delete(function(req,res){
        
        console.log("deleting");
        Collection.remove({
            _id: req.params.collection_id
        }, function(err,collection){
            if(err){
                res.send(err);
            }
            
            res.json({message: 'Successfully deleted collection'});
        });
    });

router.route('/collections/save/:collection_id')

    .put(function(req,res){
        
        console.log(req.params.collection_id);
        
        Collection.findById(req.params.collection_id, function(err,collection){
            
            if (err){
               res.send(err);
            }
            
            console.log(collection);
            collection.images.push(req.body.link);
            
            console.log(collection.images);
            
            console.log(req.body.link);
            
            
            collection.save(function(err){
                if(err){
                    res.send(err)
                }
                
                res.json({messsage: 'Successfully added image to collection'})
            })
        })
    })
    
    .delete(function(req,res){
        
        console.log("deleting");
        
        Collection.findById(req.params.collection_id, function(err,collection){
            if (err){
               res.send(err);
            }
            
            console.log(collection.images);
            var index = collection.images.indexOf(req.body.image);
            if(index > -1){
                collection.images.splice(index,1);
            }
            console.log(collection.images);
            
           collection.save(function(err){
            if(err){
                res.send(err)
            }
            
            res.json({messsage: 'Successfully deleted image from collection'})
        })
            
        });
    });


router.route('/collections/rate/:collection_id')

        .put(function(req,res){
        
        console.log(req.params.collection_id);
        
        Collection.findById(req.params.collection_id, function(err,collection){
            
            if (err){
               res.send(err);
            }
            
            collection.ratingPoints = collection.ratingPoints + parseInt(req.body.rating);
            collection.ratingNum = collection.ratingNum + 1;
            

            collection.save(function(err){
                if(err){
                    res.send(err)
                }
                
                res.json({messsage: 'Successfully updated collection'})
            })
        })
    });

router.route('/collections')

    .post(function(req,res){
        var collection = new Collection();
        collection.user = req.body.user;
        collection.title = req.body.title;
        collection.description = req.body.description;
        collection.private = req.body.private;
        collection.ratingPoints = 0;
        collection.ratingNum = 0;
        collection.images = [];
        
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
            function(err, collections) {
            if (err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted collections' });
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

