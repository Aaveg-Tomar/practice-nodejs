const express = require("express");

const {
    handleUserLogin,
    handleUserSignUp,
    handleUserDetails,
    handleUserGettingInformation,
   
} = require('../controller/user');

const { authuser } = require("../authentication/auth");

const { handleGettingJobList , handleGettingAppliedJobsDetails } = require('../controller/jobListDetail');

const {handleJobAppliedByUser} = require('../controller/applicants');


const router = express.Router();

router.post('/register',handleUserSignUp);
router.post('/login' , handleUserLogin);
router.post('/userform' , authuser , handleUserDetails);
router.post('/submitJob' , authuser , handleJobAppliedByUser)

router.get('/user/details' , authuser , handleUserGettingInformation);
router.get('/joblistDetail' , authuser , handleGettingJobList );
router.get('/appliedjobs' , authuser , handleGettingAppliedJobsDetails);



module.exports = router;