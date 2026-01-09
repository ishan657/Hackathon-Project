const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/smart-discovery', authMiddleware, userController.getSmartDiscovery);

router.post('/request/:id', authMiddleware, userController.sendFriendRequest);

router.get('/pending-requests', authMiddleware, userController.getPendingRequests);

router.post('/accept/:id', authMiddleware, userController.acceptFriendRequest);

router.get('/my-friends', authMiddleware, userController.getMyFriends);
router.patch('/profile', authMiddleware, userController.updateProfile);


router.get('/me', authMiddleware, async (req, res) => {
    const User = require('../models/User');
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
});

module.exports = router;