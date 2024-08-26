const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: {
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

UserSchema.methods.generateToken = async function() {
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

const User = mongoose.model('UserData', UserSchema);

module.exports = {
    User,
}
