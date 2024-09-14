const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    userName: {
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

    appliedJobs : {
        type: Array,
    }

});


// UserSchema.pre('save', async function(next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

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
