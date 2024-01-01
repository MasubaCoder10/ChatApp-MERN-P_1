const express = require('express');
const {registerUser, loginUser, findUser,findUsers} = require('../controllers/userCotroller')
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", findUsers);
module.exports = router;