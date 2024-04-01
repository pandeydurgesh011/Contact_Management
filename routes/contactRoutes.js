const express = require('express');
const router = express.Router();
const {createContact,getContact,getContacts,updateContact,deleteContact} = require('../controllers/contactController.js');
const validateToken = require('../middleware/valitadeTokenHandler.js');

//The validate Token middleware is user to make the routes private and can only be accessed when user is logged in and has valid token
router.use(validateToken);

router.post('/', createContact);

router.get('/', getContacts);

router.get('/:id', getContact);

router.put('/:id', updateContact);

router.delete('/:id', deleteContact);

//The above routes can also be written as below

/*
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);
*/
module.exports = router;
