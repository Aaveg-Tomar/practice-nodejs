const express = require("express");

const {
    handleUserLogin,
    handleUserSignUp,
    handleUserDetails,
} = require('../controller/user');

const {
    handleCompanyLogin,
    handleCompanySignUp
} = require('../controller/company');

const router = express.Router();

router.post('/register',handleUserSignUp);
router.post('/login' , handleUserLogin);
router.post('/userform' , handleUserDetails);


router.post('/cregister',handleCompanySignUp);
router.post('/clogin' , handleCompanyLogin);


module.exports = router;