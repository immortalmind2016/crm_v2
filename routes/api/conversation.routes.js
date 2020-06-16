
const express = require("express");
const router = express.Router();
const passport = require("passport");
const {readConversations,readMessages,sendMessage,postWebhook,getWebhook} = require('../../controllers/conversation.controller.js');
module.exports=(io)=>{
    router.get('/conversations/',readConversations);

router.get('/messages/:convId',readMessages);

router.post("/message/:recId",sendMessage)

router.post("/webhook",(req,res,next)=>{
    const message=req.body.entry[0].messaging[0]
    console.log(message)
    io.sockets.emit("message",message)
    next()
},postWebhook)
router.get("/webhook",getWebhook)
//router.use(isAdmin())

    return router
}




