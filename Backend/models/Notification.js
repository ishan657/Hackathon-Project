const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Who triggered it
  type: { 
    type: String, 
    enum: ['REQUEST_SENT', 'REQUEST_ACCEPTED', 'REQUEST_REJECTED', 'SYSTEM_ALERT'], 
    required: true 
  },
  content: { type: String, required: true }, // e.g., "Rahul rejected your study request"
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);