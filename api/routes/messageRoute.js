const express = require("express");
const {messages, getAllMessages} = require('../controllers/messageCotroller')
const router = express.Router();

router.post("/message", messages);
router.get("/getAllmessage/:chatId", getAllMessages);

module.exports = router;