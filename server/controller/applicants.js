const mongoose = require('mongoose');
const {ApplicantDetails} = require('../model/applicant');
const {User} = require('../model/user');
const {UserDetail} = require('../model/userdetail')

const handleJobAppliedByUser = async (req, res) => {
    const token = req.token;
    const { jobId } = req.body;  // Assuming you're sending the jobId in the request body
    console.log(jobId);
    console.log(token);
    
    if (!token) {
      return res.json({ status: 'error', message: 'Login First' });
    }
  
    try {
      // Find the user by token
      const findUser = await User.findOne({ token: token });
  
      if (!findUser) {
        return res.json({ status: 'error', message: 'User not found' });
      }
  
      const userId = findUser._id;
  
      // Check if the job is already applied for
      if (findUser.appliedJobs.includes(jobId)) {
        return res.json({ status: 'error', message: 'Job already applied' });
      }
  
      // Add the jobId to the user's appliedJobs array
      findUser.appliedJobs.push(jobId);
      await findUser.save();  // Save the user with the updated appliedJobs array
  
      // Save userId and jobId in the ApplicantDetails collection
      const saveUserIdJobId = await ApplicantDetails.create({
        userId: userId,
        jobId: jobId,
      });

      console.log(saveUserIdJobId);
  
      // Return success message
      return res.json({ status: 'ok', message: 'Job applied successfully' });
    } catch (err) {
      console.log('Error:', err);
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  };


  const handleApplicantsListOnJob = async (req, res) => {
    const token = req.token;
    const { jobId } = req.body;  // Assuming you're sending the jobId in the request body
    console.log(jobId);
    console.log(token);
  
    if (!token) {
      return res.json({ status: 'error', message: 'Login First' });
    }
  
    try {
      // Find all applicant userIds from ApplicantDetails corresponding to the jobId
      const findApplicants = await ApplicantDetails.find({ jobId: jobId });
  
      if (findApplicants.length === 0) {
        return res.json({ status: 'ok', message: 'No applicants found for this job' });
      }
  
      //  Extract userIds from the found applicants
      const applicantUserIds = findApplicants.map(applicant => applicant.userId);
      console.log(applicantUserIds);
  
      //  Fetch details of all users using their userIds
      const applicantsDetails = await UserDetail.find({ userId: { $in: applicantUserIds } });
      console.log(applicantsDetails);
  
     
      return res.json({ status: 'ok', applicants: applicantsDetails });
  
    } catch (err) {
      console.log('Error:', err);
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  };
  

  module.exports = {
    handleJobAppliedByUser,
    handleApplicantsListOnJob,
  }