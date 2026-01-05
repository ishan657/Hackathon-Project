const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  // --- CAMPUS FIELDS ---
  age: { type: Number, required: true },
  gender: { 
    type: String, 
    required: true, 
    enum: ['Male', 'Female', 'Non-binary', 'Other'] 
  },
  academicYear: { 
    type: String, 
    required: true, 
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Masters', 'PhD'] 
  },

  bio: String,
  interests: [String],
  hobbies: [String],
  lookingFor: String,

  // --- UPDATED FRIEND REQUESTS WITH ENUMS ---
  friendRequests: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { 
      type: String, 
      enum: ['pending', 'accepted', 'rejected'], 
      default: 'pending' 
    },
    createdAt: { type: Date, default: Date.now }
  }],

  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);