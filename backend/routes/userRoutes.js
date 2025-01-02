const express = require('express');
const { registerUser, login, LogOut, getAllUsers } = require('../controllers/userControllers');
const Authenticate = require('../middlewares/authmiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.get('/logout', Authenticate, LogOut);
router.get('/', Authenticate, getAllUsers);

module.exports = router;