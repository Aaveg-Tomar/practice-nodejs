const { Company } = require("../model/company")
const jwt = require('jsonwebtoken')


const handleCompanyLogin = async (req, res) => {
    const companyExist = await Company.findOne({
        email: req.body.email,
        password: req.body.password,
    })

    if (companyExist) {
        const token = await companyExist.generateToken();
        res.cookie("jwt", token);

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
        console.log("the error is ", err)


    }
}
module.exports = { handleCompanyLogin, handleCompanySignUp }

