const {User} = require('../model/user');
const {Company} = require('../model/company');
const {JobDetail} = require('../model/jobdetails');

const handleGettingJobList =  async(req , res) =>{
    try{
        const jobList = await JobDetail.find({});
        return res.json({status : "ok" , jobList : jobList});
    }
    catch(err){
        console.log(err);
        }

}


const handleGettingAppliedJobsDetails = async (req, res) => {
    const token = req.token;
  
    if (!token) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
  
    try {
      // Find the user by token
      const user = await User.findOne({ token: token });
  
      if (!user) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
      }
  
      // Get the array of job IDs from the appliedJobs field
      const jobIds = user.appliedJobs;
  
      // Find all jobs that match the job IDs in the appliedJobs array
      const appliedJobsDetails = await JobDetail.find({ _id: { $in: jobIds } });
  
      // Return the details of the applied jobs
      return res.json({ status: 'ok', appliedJobs: appliedJobsDetails });
    } catch (err) {
      console.log('Error:', err);
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  };
  


module.exports = {
    handleGettingJobList,
    handleGettingAppliedJobsDetails,

}


