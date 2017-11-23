//server.js

//&what is this?
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//importing all packages
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const app = express()


const api = require('./routes/routes')

// Parsers
app.use(require('cookie-parser')())
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// Angular DIST output folder
app.use(express.static(path.join(__dirname, './nasa-app/dist')));

// API Location
app.use('/api', api)

// Send all other requests to Angular App
app.get('*', (req,res) => {
 res.sendFile(path.join(__dirname, './nasa-app/dist/index.html'));
});


//declaring port to listen on
const port = process.env.PORT || 8080;
app.set('port',port);

//listen to app on specified port
app.listen(port)
console.log("listening on port: " + port)

//export app so it can be use anywhere
module.exports = app
