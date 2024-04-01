const express = require('express');
const router = express.Router();
const {createUser, loginUser, currentUser} = require('../controllers/userController');
const validateToken = require('../middleware/valitadeTokenHandler');

router.post('/register',createUser);
router.get('/login', loginUser);
router.get('/current',validateToken, currentUser);

module.exports = router;