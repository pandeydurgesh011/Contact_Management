const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel.js');

const createContact = asyncHandler(async(req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400).json({ error: "All the fields are mandatory" });
        return;
    }
    try {
        const contact = await Contact.create({ name, email, phone,user_id: req.user.id });
        res.status(201).json(contact);
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


const getContacts = asyncHandler(async(req,res)=>{
    const contact = await Contact.find({user_id: req.user.id});
    res.status(200).json(contact);
});

const getContact = asyncHandler(async(req,res)=>{
    
    try {
        const {id} = req.params;
        const contact = await Contact.findById(id);
        if(!contact || contact.user_id.toString() !== req.user.id){
            res.status(404).json({message:"Contact Not found"})
            return
        }
        res.status(200).json(contact);
        console.log(contact)
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    
});

const updateContact = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    try {
        const contact = await Contact.findById(id);
        if (!contact){
            res.json(404);
            throw new Error("Contact not found")
        }
        if (contact.user_id.toString() == req.user.id){
            await Contact.findByIdAndUpdate(id,req.body);
            const updatedContact = await Contact.findById(id); 
            res.status(200).json(updatedContact)
            return
        }
        else{
            res.status(404).json({message:"Contact Not found"})
            return
        }
        
    } catch (error) {
        console.error("Error Updating contact:", error);
        res.status(500).json({ error: "Internal Server Error" });
        
    }  
})

const deleteContact = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const contact = await Contact.findById(id);
        if (!contact){
            res.status(404).json({message:"Contact Not found with given ID"});
        }
        if (contact.user_id.toString() !== req.user.id){
            res.status(403);
            throw new Error("User is not authorized to delete a contact");
        }
        const deletedContact = await Contact.findByIdAndDelete(id);
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