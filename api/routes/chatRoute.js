const express = require('express');
const {createChat, findUsersChats, findChat} = require("../controllers/ChatCotroller");

const router = express.Router();

router.post("/", createChat);
router.get('/:userId', findUsersChats)
router.get('/find/:firstId/:secondId', findChat);

module.exports = router;