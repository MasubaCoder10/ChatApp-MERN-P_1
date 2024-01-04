const Message = require("../models/messageMedel");

// Create a new message
module.exports.messages = async(req, res)=>{
    const {chatId, senderId, content} = req.body;
    try{
        const newmMessage =new Message({
            chatId, senderId, content
        });

        const savedMessage = await newmMessage.save();
        res.status(200).json(savedMessage);     

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}
// Get all messages between two users

module.exports.getAllMessages = async(req, res)=>{
    const {chatId} = req.params;

    try{
        const messages = await Message.find({chatId})

        res.status(200).json(messages);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}