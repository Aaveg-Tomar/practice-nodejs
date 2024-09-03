const express = require("express");

const {
    handleUserLogin,
    handleUserSignUp,
    handleUserDetails,
    handleUserGettingInformation
} = require('../controller/user');

const { authuser } = require("../authentication/auth");


const router = express.Router();

router.post('/register',handleUserSignUp);
router.post('/login' , handleUserLogin);
router.post('/userform' , authuser , handleUserDetails);
router.get('/user/details' , authuser , handleUserGettingInformation);

module.exports = router;