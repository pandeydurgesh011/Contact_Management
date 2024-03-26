const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the contact name"]
    },
    email: {
        type: String,
        required: [true, "Please add the contact email"]
    },
    phone: {
        type: Number,
        required: [true, "Please add contact Phone number"]
    },
},
    {
        Timestamp: true
    }
);

module.exports = mongoose.model("Contact", contactSchema);