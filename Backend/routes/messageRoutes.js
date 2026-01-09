const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middlewares/authMiddleware');

// GET messages for a specific conversation
router.get('/:conversationId', auth, async (req, res) => {
  try {
    const messages = await Message.find({ 
      conversationId: req.params.conversationId 
    }).sort({ createdAt: 1 }); // Sort by time so chat flows correctly
    
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;