const express = require('express')
const { Signup,Login,GetUser,DeleteUser } = require('../Controllers/Users/Users')
const Fetchuser = require('../Middleware/Fetchuser')

const router = express.Router(); 

router.post('/signup',Signup)
router.post('/login',Login)
router.get('/get-user',Fetchuser,GetUser)
router.delete('/delete-user/:id',DeleteUser);

module.exports = router