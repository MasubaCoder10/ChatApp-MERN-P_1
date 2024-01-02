const chatModel = require("../models/ChatModel");

module.exports.createChat = async(req, res)=>{
    const {firstId, secondId} = req.body;
    try{
        // checked if chat exist
        const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]}
        })
        if(chat) return res.status(200).json(chat);

        // creation of the new chat
        const newChat = new chatModel({
            members: [firstId, secondId]
        })

        const response = await newChat.save()
        res.status(200).json(response);

    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }   
}

module.exports.findUsersChats = async(req, res)=>{
    const userId = req.params.userId;

    try{
        const chats = await chatModel.find({
            members: {$in: [userId]}
        })
        res.status(200).json(chats);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports.findChat = async(req, res)=>{
    const {firstId, secondId} = req.params;
    try{
        const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]}
        })
        res.status(200).json(chat);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}