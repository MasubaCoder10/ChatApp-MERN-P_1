const Message = require("../models/messageMedel");

// Create a new message
module.exports.messages = async(req, res)=>{
    const {sender, receiver, content} = req.body;
    try{
        const newmMessage =new Message({
            sender, receiver, content
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
    const {senderId, receiverId} = req.params;

    try{
        const messages = await Message.find({
            $or:[{sender: senderId, receiver: receiverId},
            {receiver: receiverId, sender: senderId}]
        }).sort('timestamp');

        res.status(200).json(messages);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}