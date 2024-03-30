const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please enter user name"]
    },
    email:{
        type: String,
        required: [true, "Please enter Email ID"],
        unique: [true, "Email Already taken"]
    },
    password:{
        type: String,
        required: [true, "Please enter strong Password"]
    },
    
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);