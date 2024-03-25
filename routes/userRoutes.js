const express = require('express');
const router = express.Router();
const {createContact,getContact,getContacts,updateContact,deleteContact} = require('../controllers/userController.js');


router.post('/', createContact);

router.get('/', getContacts);

router.get('/:id', getContact);

router.put('/:id', updateContact);

router.delete('/:id', deleteContact);

module.exports = router;
