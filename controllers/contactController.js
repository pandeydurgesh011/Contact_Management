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
    
    try {
        const {id} = req.params;
        const contact = await Contact.findById(id);
        if(!contact){
            res.status(404).json({message:"Contact Not found"})
        }
        res.status(200).json(contact);
        console.log(contact)
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    
});

const updateContact = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const contact = await Contact.findByIdAndUpdate(id,req.body)
        if (!contact){
            res.status(404).json({error: "Contact not Found"});
            return;
        }
        const updatedContact = await Contact.findById(id)
        res.status(200).json(updatedContact)
    } catch (error) {
        console.error("Error updating the contact", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

const deleteContact = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact){
            res.status(404).json({message:"Contact Not found with given ID"});
        }
        res.status(200).json({message:"Contact Deleted"})
        
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports =  {
    createContact,
    getContact,
    getContacts,
    updateContact,
    deleteContact
}