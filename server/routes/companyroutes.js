const express = require("express");

const {
    handleCompanyLogin,
    handleCompanySignUp,
    handleJobDetails,
    handleGettingJobs
} = require('../controller/company');

const {authCompany} = require('../authentication/auth');

const crouter = express.Router();

crouter.post('/cregister',handleCompanySignUp);
crouter.post('/clogin' , handleCompanyLogin);
crouter.post('/jobdetails' , authCompany , handleJobDetails);
crouter.get('/showjobs' , authCompany , handleGettingJobs);




module.exports = crouter;