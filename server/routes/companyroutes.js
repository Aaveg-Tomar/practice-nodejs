const express = require("express");

const {
    handleCompanyLogin,
    handleCompanySignUp,
    handleJobDetails
} = require('../controller/company');

const crouter = express.Router();

crouter.post('/cregister',handleCompanySignUp);
crouter.post('/clogin' , handleCompanyLogin);
crouter.post('/jobdetails' , handleJobDetails);


module.exports = crouter;