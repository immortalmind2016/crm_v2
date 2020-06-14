
const express = require("express");
const router = express.Router();
const passport = require("passport");
const {readConversations,readMessages} = require('../../controllers/conversation.controller.js');



router.get('/conversations/',readConversations);

router.get('/messages/:convId',readMessages);

//router.use(isAdmin())

module.exports = router;
