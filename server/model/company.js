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
    companyName :{
        type:String,
        required:true,

    },
    jobDescription : {
        type: String,
        required : true,
    },
    jobTitle : {
        type: String,
        required : true,
    },
    jobLocation : {
        type: String,
        required : true,
    },
    jobEligibility: {
        marks10th: {
            type: Number,
            required: true,
        },
        marks12th: {
            type: Number,
            required: true,
        },
        btechMarks: {
            type: Number,
            required: true,
        }
    }
    
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