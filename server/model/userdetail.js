const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const UserDetailsSchema = new mongoose.Schema({
    token: {
        type: String,
        
    },
    collegeName : {
        type: String,
        required : true
    },
    FullName : {
        type : String,
        required : true,
    },
    phnNumber  : {
        type : Number,
        required : true,
        unique : true,
    },

    userMarks : {
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
    },
});


const UserDetail = mongoose.model('UserDetail', UserDetailsSchema);

module.exports = {
    UserDetail,
}