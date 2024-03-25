const asyncHandler = require('express-async-handler');

const createContact = asyncHandler(async(req,res)=>{
    console.log("Create contact")
});

const getContacts = asyncHandler(async(req,res)=>{
    console.log("Get contact details API")
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