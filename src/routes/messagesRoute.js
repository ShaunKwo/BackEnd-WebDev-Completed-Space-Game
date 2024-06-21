//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

const express = require('express');
const router = express.Router();
const controller = require('../controllers/messagesController')


router.get("/",controller.readAllMessages)
router.post("/:user_id",controller.createNewMessages)
router.put("/:message_id",controller.updateMessagesById)
router.delete("/:message_id",controller.deleteMessagesById)



module.exports = router;