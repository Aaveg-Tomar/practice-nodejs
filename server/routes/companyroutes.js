const express = require("express");

const {
    handleCompanyLogin,
    handleCompanySignUp,
    handleJobDetails
} = require('../controller/company');

const {authCompany} = require('../authentication/auth');

const crouter = express.Router();

crouter.post('/cregister',handleCompanySignUp);
crouter.post('/clogin' , handleCompanyLogin);
crouter.post('/jobdetails' , authCompany , handleJobDetails);


module.exports = crouter;