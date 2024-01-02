const mongoose = require('mongoose');

// Define a schema for a Message
const messageSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    content:  String, 
},
{
    timestamps: true,
});

// Create a model based on the defined schema
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
