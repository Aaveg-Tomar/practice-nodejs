const { User } = require("../model/user");
const { UserDetail } = require("../model/userdetail");
const jwt = require('jsonwebtoken')



const handleUserLogin = async (req, res) => {
    const userExist = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })

    if (userExist) {
        const token = await userExist.generateToken();
        await res.cookie("jwt", token , {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: false, 
        });

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
        console.log(user);
        
        await user.save();

        res.json({ status: 'ok' });

    } catch (err) {
        res.json({ status: 'error' })
        console.log("the error is ", err)


    }
}


const handleUserDetails = async (req, res) => {
    
    try {
        
        const email=req.body.email;
        const user = await User.findOne({ email: email });
        if(!user){
            return res.json({ status: 'error email/user not available', user: false })
        }
       
        const userDetails = await UserDetail.findOneAndUpdate(
            { userId:user._id },
            {
                fullName: req.body.fullName,
                collegeName: req.body.collegeName,
                phnNumber: req.body.phnNumber,
                userMarks: {
                    marks10th: req.body.userMarks.marks10th,
                    marks12th: req.body.userMarks.marks12th,
                    btechMarks: req.body.userMarks.btechMarks,
                }
            },
            { new: true, upsert: true } // Create a new document if none exists
        );

        const userAvailable=await UserDetail.find({userId:user._id}).populate('userId');
        console.log(userAvailable);
        
        res.json({ status: 'ok', user: userDetails });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};



module.exports = {
    handleUserLogin,
    handleUserSignUp,
    handleUserDetails,
}