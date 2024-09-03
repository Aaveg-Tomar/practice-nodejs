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
    console.log(req.body);
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
        console.log(token);
        
        
        const companyExist = await Company.findOne({ token: token });
        console.log(companyExist);
        if (!companyExist) {
            return res.json({ status: 'error not found', user: false })
        }

         

        const jobDetails = await JobDetail.findOneAndUpdate(
            { companyId: companyExist._id },
            {
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
            { new: true, upsert: true }

        );

        const companyAvailable = await JobDetail.find({ companyId: companyExist._id }).populate('companyId');
        console.log(companyAvailable);
        res.json({ status: 'ok', user: true, companyExist : jobDetails });


    } catch (err) {
        console.log(err)
    }


}

module.exports = { handleCompanyLogin, handleCompanySignUp, handleJobDetails }

