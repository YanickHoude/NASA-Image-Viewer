// Use the express router
const express = require('express')
const router = express.Router()

// Bring in an instance of the backend controller file for optional access to do more backend development
const ctrl = require('../controllers/controller')


// All these routes reside on top of the /api route


//router.get('/test', ctrl.test) //testing the front end/back end communication

router.get('/getImages', ctrl.getImages)

router.put('/deleteUser', ctrl.deleteUser)

// Make the router visible to other files
module.exports = router