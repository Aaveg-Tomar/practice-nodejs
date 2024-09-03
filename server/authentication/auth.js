const jwt = require('jsonwebtoken');
const { Company } = require('../model/company');
const { User } = require('../model/user');

const authuser = async(req , res , next) =>{
   
    let token=req.cookies.jwt;
    if(!token){
        res.status(401).send("Authorization Fails")
    }
    
    const verify=jwt.verify(token,'abc');
    const userExist=await User.findOne({_id:verify._id,token});
    if(!userExist){
        throw new Error("User Not Found");
    }

    req.token=token;
    req.rootUser=userExist;
    req.userId=userExist._id;
    next();
    
}


const authCompany = async(req , res , next) =>{
    let token=req.cookies.jwt;  

    if(!token){
        res.status(401).send("Authorization Fails")
    }
   
    const verify=jwt.verify(token,'abc');
    const companyExist = await Company.findOne({_id:verify._id,token});
    if(!companyExist){
        throw new Error("User Not Found");
    }

    req.token=token;
    req.rootCompany=companyExist;
    req.companyId=companyExist._id;
    next();
}


module.exports = {
    authuser,
    authCompany,
}
