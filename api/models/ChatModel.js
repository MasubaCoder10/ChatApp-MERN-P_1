const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    members: Array,
},
{
    timestamps: true,
})

const chatModel = mongoose.model("Chat", ChatSchema);

module.exports = chatModel;