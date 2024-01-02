const express = require('express');
const {createChat, findUsersChats, findChat} = require("../controllers/ChatCotroller");

const router = express.Router();

router.post("/", createChat);
router.get('/findUsers/:userId', findUsersChats)
router.get('/findChat/:firstId/:secondId', findChat);

module.exports = router;