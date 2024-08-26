const {User} = require("../model/user")
const  jwt  = require('jsonwebtoken')


const handleUserLogin = async(req , res) =>{
    const userExist =  await User.findOne({
        email : req.body.email,
        password : req.body.password,
       })
       
       if(userExist){
        const token = await userExist.generateToken();
        res.cookie("jwt", token);

         return res.json({
            status: true,
            token: token,
            id: userExist._id,
          });
       }else{
        return res.json({status : 'error'  , user :  false})
       }
}


const handleUserSignUp = async(req , res) =>{
    console.log(req.body);
    try{
        const user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        })
        res.json({status : 'ok'});

    } catch( err){
        res.json({status : 'error'})
        console.log("the error is " , err)
        

    }
}


module.exports = {
    handleUserLogin,
    handleUserSignUp,
}