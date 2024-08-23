const express = require("express");

const {
    handleUserLogin,
    handleUserSignUp
} = require('../controller/user')

const router = express.Router();

router.post('/register',handleUserSignUp);
router.post('/login' , handleUserLogin);

module.exports = router;