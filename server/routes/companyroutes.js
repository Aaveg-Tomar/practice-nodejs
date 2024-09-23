const express = require("express");

const {
    handleCompanyLogin,
    handleCompanySignUp,
    handleJobDetails,
    handleGettingJobs
} = require('../controller/company');

const {authCompany} = require('../authentication/auth');
const {handleApplicantsListOnJob} = require('../controller/applicants')

const crouter = express.Router();

crouter.post('/cregister',handleCompanySignUp);
crouter.post('/clogin' , handleCompanyLogin);
crouter.post('/jobdetails' , authCompany , handleJobDetails);

crouter.post('/applicantDetails' , authCompany , handleApplicantsListOnJob);
crouter.get('/showjobs' , authCompany , handleGettingJobs);




module.exports = crouter;