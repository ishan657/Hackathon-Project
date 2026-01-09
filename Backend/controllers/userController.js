const User = require('../models/User');
const geminiService = require('../services/geminiService');
const Conversation = require('../models/Conversation');
const Notification = require('../models/Notification'); // Ensure this is imported!
const mongoose = require('mongoose');

// 1. SMART DISCOVERY
exports.getSmartDiscovery = async (req, res) => {
  console.log("🚀 [DEBUG]: Smart Discovery Route Hit by User:", req.user.id);
  
  try {
    const currentUser = await User.findById(req.user.id);
    console.log("👤 [DEBUG]: Current User Intent:", currentUser.lookingFor);

    const excludeIds = [...currentUser.friends, ...currentUser.friendRequests.map(r => r.user), req.user.id];
    const allUsers = await User.find({ _id: { $nin: excludeIds } }).limit(20);
    
    console.log(`🔍 [DEBUG]: Found ${allUsers.length} potential candidates for ranking.`);

    if (allUsers.length === 0) {
      return res.json({ msg: "No new users found" });
    }

    // Call Gemini
    console.log("🤖 [DEBUG]: Sending data to Gemini Service...");
    const recommendations = await geminiService.rankMatches(currentUser, allUsers);
    
    console.log("✅ [DEBUG]: Gemini Response Received:", recommendations);
    res.json(recommendations);

  }catch (err) {
    console.error("🔥 BACKEND CRASH:", err); // <--- ADD THIS LINE
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

// 2. SEND FRIEND REQUEST + NOTIFICATION
exports.sendFriendRequest = async (req, res) => {
  try {
    // 1. Identify Sender (from token) and Receiver (from URL)
    const senderId = req.user.id || req.user._id; 
    const receiverId = req.params.id;

    // 2. Prevent self-requests
    if (senderId === receiverId) {
      return res.status(400).json({ msg: "You cannot connect with yourself." });
    }

    // 3. CRITICAL: Validate ID format to prevent 500 crashes
    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ msg: "Invalid User ID format." });
    }

    // 4. Fetch users
    const receiver = await User.findById(receiverId);
    const sender = await User.findById(senderId);

    if (!receiver) return res.status(404).json({ msg: "User no longer exists." });
    if (!sender) return res.status(401).json({ msg: "Sender session invalid." });

    // 5. Check if request already exists
    const alreadyExists = receiver.friendRequests.some(r => r.user.toString() === senderId);
    if (alreadyExists) {
      return res.status(400).json({ msg: "A request is already pending with this user." });
    }

    // 6. Save Request
    receiver.friendRequests.push({ user: senderId, status: 'pending' });
    await receiver.save();

    // 7. Create Notification (Inside a sub-try/catch so it doesn't break the main request)
    try {
      const newNotif = new Notification({
        recipient: receiverId,
        sender: senderId,
        type: 'SYSTEM_ALERT',
        content: `${sender.name} sent you a tribe request!`
      });
      await newNotif.save();
    } catch (notifError) {
      console.error("Notification failed but request succeeded:", notifError.message);
    }

    res.json({ msg: "Friend request sent successfully!" });

  } catch (err) {
    console.error("🔥 BACKEND ERROR:", err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

// 3. GET PENDING REQUESTS
exports.getPendingRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('friendRequests.user', 'name bio academicYear gender age interests'); 
    const pendingList = user.friendRequests.filter(req => req.status === 'pending');
    res.json(pendingList);
  } catch (err) {
    res.status(500).send("Error fetching requests");
  }
};

// 4. ACCEPT FRIEND REQUEST + NOTIFICATION
exports.acceptFriendRequest = async (req, res) => {
  try {
    const me = await User.findById(req.user.id);
    const sender = await User.findById(req.params.id);

    if (!sender) return res.status(404).json({ msg: "User not found" });

    const request = me.friendRequests.find(
      r => r.user.toString() === req.params.id && r.status === 'pending'
    );

    if (!request) return res.status(400).json({ msg: "No pending request found" });

    request.status = 'accepted';
    me.friends.push(req.params.id);
    sender.friends.push(req.user.id);

    let conversation = await Conversation.findOne({
      participants: { $all: [req.user.id, req.params.id] }
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [req.user.id, req.params.id],
        lastMessage: "You are now connected! Start chatting."
      });
      await conversation.save();
    }

    await me.save();
    await sender.save();

    // CREATE NOTIFICATION FOR THE SENDER (The one who initiated the request)
    const newNotif = new Notification({
      recipient: sender._id,
      sender: me._id,
      type: 'REQUEST_ACCEPTED',
      content: `${me.name} accepted your tribe request! Check your chats.`
    });
    await newNotif.save();
    console.log(`✅ Accept log created for ${sender.name}`);

    res.json({ 
      msg: "Connection successful!", 
      conversationId: conversation._id 
    });
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};

// 5. REJECT FRIEND REQUEST + NOTIFICATION (The missing piece for your logs!)
exports.rejectFriendRequest = async (req, res) => {
  try {
    const me = await User.findById(req.user.id);
    const senderId = req.params.id;

    const request = me.friendRequests.find(
      r => r.user.toString() === senderId && r.status === 'pending'
    );

    if (!request) return res.status(400).json({ msg: "No pending request found" });

    // Mark as rejected
    request.status = 'rejected';
    await me.save();

    // CREATE NOTIFICATION FOR THE SENDER
    const newNotif = new Notification({
      recipient: senderId,
      sender: me._id,
      type: 'REQUEST_REJECTED',
      content: `Your tribe request to a student was declined.`
    });
    await newNotif.save();
    console.log(`❌ Reject log created for user ${senderId}`);

    res.json({ msg: "Request declined." });
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};

// 6. GET ALL FRIENDS
exports.getMyFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friends', 'name academicYear');
    if (!user) return res.status(404).json({ msg: "User not found" });

    const friendsWithChat = await Promise.all(user.friends.map(async (friend) => {
      let conversation = await Conversation.findOne({
        participants: { $all: [req.user.id, friend._id] }
      });

      if (!conversation) {
        conversation = new Conversation({
          participants: [req.user.id, friend._id],
          lastMessage: "Conversation started"
        });
        await conversation.save();
      }

      return {
        _id: friend._id,
        name: friend.name,
        academicYear: friend.academicYear,
        conversationId: conversation._id 
      };
    }));

    res.json(friendsWithChat);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};
// 7. UPDATE PROFILE (For Dashboard / Progressive Profiling)
exports.updateProfile = async (req, res) => {
  try {
    // These are the fields the user will fill in on the dashboard
    const {  
      lookingFor, 
      bio, 
      interests, 
      academicYear, 
      dept, 
      age 
    } = req.body;

    // We build an update object dynamically
    const updateFields = {};
    if (lookingFor) updateFields.lookingFor = lookingFor;
    if (bio) updateFields.bio = bio;
    if (interests) updateFields.interests = interests;
    if (academicYear) updateFields.academicYear = academicYear;
    if (dept) updateFields.dept = dept;
    if (age) updateFields.age = Number(age);

    // req.user.id is provided by your existing jwtMiddleware
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { 
        new: true,           // Return the updated document
        runValidators: true  // Ensure enum ['1st', '2nd'...] is still checked
      }
    ).select('-password'); // Don't send the password back to frontend

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    console.log(`✨ Profile updated for: ${user.name}`);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'ValidationError') {
       return res.status(400).json({ msg: err.message });
    }
    res.status(500).send("Server Error updating profile");
  }
};