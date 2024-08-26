const jwt = require('jsonwebtoken');

const authuser = async(req , res , next) =>{
    const token = req.headers.authorization;
    if(!token){
        res.status(401).send("Authorization Fails")
    }
    if(token.startsWith('Bearer ')){
        token=token.split(' ')[1];
    }
    const verify=jwt.verify(token,'abc');
    const userExist=await User.findOne({_id:verify._id,tokens:token});
    if(!userExist){
        throw new Error("User Not Found");
    }

    req.token=token;
    req.rootUser=userExist;
    req.userId=userExist._id;
    next();
}

module.exports = {
    authuser,
}
