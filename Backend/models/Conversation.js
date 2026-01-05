const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  // Stores IDs of the two students in the chat
  participants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  // Stores the latest encrypted message snippet for the inbox view
  lastMessage: { 
    type: String, 
    default: "" 
  },
}, { timestamps: true });

// Ensure a quick lookup when finding chats for a specific user
ConversationSchema.index({ participants: 1 });

module.exports = mongoose.model('Conversation', ConversationSchema);