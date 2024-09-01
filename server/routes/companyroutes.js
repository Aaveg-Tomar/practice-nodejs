const express = require("express");

const {
    handleCompanyLogin,
    handleCompanySignUp
} = require('../controller/company');

const crouter = express.Router();

crouter.post('/cregister',handleCompanySignUp);
crouter.post('/clogin' , handleCompanyLogin);


module.exports = crouter;