const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  conversationId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Conversation', 
    required: true 
  },
  sender: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  // This will be the garbled/encrypted string
  encryptedText: { 
    type: String, 
    required: true 
  },
  // Required to decrypt the AES-256 message on the receiver's side
  iv: { 
    type: String, 
    required: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);