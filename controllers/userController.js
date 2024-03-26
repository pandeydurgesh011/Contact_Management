const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel.js');

const createContact = asyncHandler(async(req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400).json({ error: "All the fields are mandatory" });
        return;
    }
    try {
        const contact = await Contact.create({ name, email, phone });
        res.status(201).json(contact);
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


const getContacts = asyncHandler(async(req,res)=>{
    const contact = await Contact.find();
    res.status(200).json(contact);
});

const getContact = asyncHandler(async(req,res)=>{
    console.log("Get contact details by ID")
});

const updateContact = asyncHandler(async(req,resp)=>{
    console.log("Update contact details")
});

const deleteContact = asyncHandler(async(req,res)=>{
    console.log("delete contact")
});

module.exports =  {
    createContact,
    getContact,
    getContacts,
    updateContact,
    deleteContact
}