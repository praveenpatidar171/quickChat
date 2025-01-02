const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageControllers');
const Authenticate = require('../middlewares/authmiddleware');
const router = express.Router();

router.post('/send/:id', Authenticate, sendMessage);

router.get('/:id', Authenticate, getMessages);

module.exports = router;