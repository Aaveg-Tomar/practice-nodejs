const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const ApplicantSchema = new mongoose.Schema({
    jobId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobDetail',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetail',
        required: true,
    },
    
    
});



const ApplicantDetails = mongoose.model('ApplicantDetail', ApplicantSchema);

module.exports = {
    ApplicantDetails,
}