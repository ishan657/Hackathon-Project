const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/recent', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const notifications = await Notification.find({ recipient: userId })
      .sort({ createdAt: -1 })
      .limit(10)
      // THIS IS THE NECESSARY PART TO MAKE INFO APPEAR
      .populate('sender', 'name lookingFor avatar'); 

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;