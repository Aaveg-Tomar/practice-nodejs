const { Company } = require("../model/company")
const jwt = require('jsonwebtoken');
const { JobDetail } = require("../model/jobdetails");


const handleCompanyLogin = async (req, res) => {
    const companyExist = await Company.findOne({
        email: req.body.email,
        password: req.body.password,
    })

    if (companyExist) {
        const token = await companyExist.generateToken();
        await res.cookie("jwt", token , {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: false,
        });

        return res.json({
            status: true,
            token: token,
            id: companyExist._id,
        });
    } else {
        return res.json({ status: 'error', user: false })
    }
}


const handleCompanySignUp = async (req, res) => {
    // console.log(req.body);
    try {
        const company = await Company.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json({ status: 'ok' });

    } catch (err) {
        res.json({ status: 'error' })
        console.log("the error is ", err);
    }
}

const handleJobDetails = async (req, res) => {

    try {
        const token = req.token;
        // console.log(token);
        
        
        const companyExist = await Company.findOne({ token: token });
        console.log(companyExist);
        if (!companyExist) {
            return res.json({ status: 'error not found', user: false })
        }

    
        

        //  console.log(req.body);

        const jobDetails = await JobDetail.create(
            // { companyId: companyExist._id },
            {
                companyId: companyExist._id ,
                companyName: req.body.companyName,
                jobTitle: req.body.jobTitle,
                jobDescription: req.body.jobDescription,
                jobLocation: req.body.jobLocation,
                salary: req.body.salary,
                bondPeriod: req.body.bondPeriod,
                jobEligibility: {
                    marks10th: req.body.jobEligibility.marks10th,
                    marks12th: req.body.jobEligibility.marks12th,
                    btechMarks: req.body.jobEligibility.btechMarks,
                }
            },
            // { new: true, upsert: true }

        );
        // console.log(jobDetails);
        await jobDetails.save();
        // console.log(jobDetails);

        const companyAvailable = await JobDetail.find({ companyId: companyExist._id }).populate('companyId');
        // console.log(companyAvailable);
        res.json({ status: 'ok', user: true, companyExist : jobDetails });


    } catch (err) {
        console.log(err)
    }
}

const handleGettingJobs = async(req , res) =>{
   

    try {
        
        const token = req.token;

        if(!token){
            return res.json({ status: 'error', message: 'Login First' });
        }
        // Find the companyexist with the token
        const findCompnay = await Company.findOne({ token: token });
        console.log(findCompnay);

        if(!findCompnay){
            return res.json({ status: 'error', message: 'Company Not Found' });
        }

        const companyId = findCompnay._id;

        const jobsdetails = await JobDetail.find({ companyId: companyId }).populate('companyId');
        console.log("jobsdetails");
        console.log(jobsdetails);

        if(!jobsdetails){
            return res.json({ status: 'error', message: 'No Jobs Available' });
        }

        return  res.json({ status: 'ok', user: true, jobsdetails: jobsdetails });
       
    
    } catch (err) {
        console.log('Error:', err);
        return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
    
}

module.exports = { handleCompanyLogin, handleCompanySignUp, handleJobDetails , handleGettingJobs}

