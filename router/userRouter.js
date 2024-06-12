
const express = require('express');
const { home, userLoginPost, userSignUpPost, logOut, getUser } = require('../controller/userController');
const router = express.Router();

router.get('/', home);

// router.post('/getUser', getUsers);

router.post('/userLoginPost',userLoginPost)

router.post('/userSignUpPost',userSignUpPost)

router.get('/userLogOut',logOut)

router.get('/getUser',getUser)

module.exports = router;

