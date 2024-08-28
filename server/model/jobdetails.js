const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const JobDetailSchema = new mongoose.Schema({
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
    salary : {
        type: Number,
        required : true,
    },
    bondPeriod : {

        type : String,
        required : true
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



const JobDetail = mongoose.model('JobDetail', JobDetailSchema);

module.exports = {
    JobDetail,
}