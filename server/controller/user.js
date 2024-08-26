const { User } = require("../model/user")
const jwt = require('jsonwebtoken')


const handleUserLogin = async (req, res) => {
    const userExist = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })

    if (userExist) {
        const token = await userExist.generateToken();
        res.cookie("jwt", token);

        return res.json({
            status: true,
            token: token,
            id: userExist._id,
        });
    } else {
        return res.json({ status: 'error', user: false })
    }
}


const handleUserSignUp = async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.create({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        })
        res.json({ status: 'ok' });

    } catch (err) {
        res.json({ status: 'error' })
        console.log("the error is ", err)


    }
}


const handleUserDetails = async (req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.json({ status: 'error', user: false });
    }
    try {
        const user = jwt.verify(token, 'abc'); // Verify token and extract user ID
        const userdetails = await User.findOneAndUpdate(
            { _id: user._id }, // Find the user by ID
            {
                fullName: req.body.fullName,
                collegeName: req.body.collegeName,
                phnNumber: req.body.phnNumber,
                userMarks: {
                    marks10th: req.body.marks10th,
                    marks12th: req.body.marks12th,
                    btechMarks: req.body.btechMarks,
                }
            },
            { new: true, upsert: true } // Create a new record if one doesn't exist
        );
        res.json({ status: 'ok', user: userdetails });
    } catch (err) {
        console.error(err);
        res.json({ status: 'error', user: false });
    }
};



module.exports = {
    handleUserLogin,
    handleUserSignUp,
}