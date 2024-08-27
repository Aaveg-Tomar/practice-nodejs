const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    token: {
        type: String,
        
    },
    
});

CompanySchema.methods.generateToken = async function() {
    try {
        const token = jwt.sign({_id: this._id}, 'abc');
        this.token = token;
        await this.save();
        return token;
    } catch (err) {
        console.log("Error while generating token");
        console.error(err);
    }
}

const Company = mongoose.model('CompanyData', CompanySchema);

module.exports = {
    Company,
}