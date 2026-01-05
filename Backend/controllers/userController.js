const User = require('../models/User');
const geminiService = require('../services/geminiService');
const Conversation = require('../models/Conversation'); // Add this at the top!

// 1. SMART DISCOVERY: Gemini ranks based on your new Campus Fields
exports.getSmartDiscovery = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    
    // We only suggest users who aren't already friends or have a pending request
    const excludeIds = [
      ...currentUser.friends,
      ...currentUser.friendRequests.map(r => r.user),
      req.user.id
    ];

    const allUsers = await User.find({ _id: { $nin: excludeIds } }).limit(10);

    if (allUsers.length === 0) return res.json({ msg: "No new users found" });

    const recommendations = await geminiService.rankMatches(currentUser, allUsers);
    res.json(recommendations);

  } catch (err) {
    console.error("❌ ERROR IN SMART DISCOVERY:", err); 
    res.status(500).json({ error: err.message });
  }
};

// 2. SEND FRIEND REQUEST: Now pushes an object with a default 'pending' status
exports.sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const receiverId = req.params.id;

    if (senderId === receiverId) return res.status(400).json({ msg: "Cannot request yourself" });

    const receiver = await User.findById(receiverId);
    if (!receiver) return res.status(404).json({ msg: "User not found" });

    // Check if a request from this sender already exists in receiver's list
    const alreadyExists = receiver.friendRequests.some(
      req => req.user.toString() === senderId
    );

    if (alreadyExists) return res.status(400).json({ msg: "Request already pending or processed" });

    // Add as a subdocument object
    receiver.friendRequests.push({ user: senderId, status: 'pending' });
    await receiver.save();

    res.json({ msg: "Friend request sent successfully!" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// 3. GET PENDING REQUESTS: Populates the 'user' field inside the subdocument
exports.getPendingRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('friendRequests.user', 'name bio academicYear gender age interests'); 
    
    // Only return the ones that are still 'pending'
    const pendingList = user.friendRequests.filter(req => req.status === 'pending');
    
    res.json(pendingList);
  } catch (err) {
    res.status(500).send("Error fetching requests");
  }
};

// 4. ACCEPT FRIEND REQUEST: Updates the status to 'accepted' and adds to friends
exports.acceptFriendRequest = async (req, res) => {
  try {
    const me = await User.findById(req.user.id);
    const sender = await User.findById(req.params.id);

    if (!sender) return res.status(404).json({ msg: "User not found" });

    const request = me.friendRequests.find(
      r => r.user.toString() === req.params.id && r.status === 'pending'
    );

    if (!request) return res.status(400).json({ msg: "No pending request found" });

    // 1. Update status and mutual friends
    request.status = 'accepted';
    me.friends.push(req.params.id);
    sender.friends.push(req.user.id);

    // 2. CREATE OR FIND THE CHAT ROOM (The Missing Part)
    // We check if a room already exists to prevent duplicates
    let conversation = await Conversation.findOne({
      participants: { $all: [req.user.id, req.params.id] }
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [req.user.id, req.params.id],
        lastMessage: "You are now connected! Start chatting."
      });
      await conversation.save(); // Save the new room to MongoDB
    }

    await me.save();
    await sender.save();

    // 3. NOW it will return the ID successfully
    res.json({ 
      msg: "Connection successful! You are now friends.", 
      conversationId: conversation._id // Now 'conversation' is defined!
    });

  } catch (err) {
    console.error(err); // Always log the error to see what went wrong
    res.status(500).send("Error accepting request: " + err.message);
  }
};

// 6. GET ALL FRIENDS: Return simple list of friends with their IDs
// GET ALL FRIENDS: Returns only user details
exports.getMyFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friends', 'name academicYear');
    if (!user) return res.status(404).json({ msg: "User not found" });

    const friendsWithChat = await Promise.all(user.friends.map(async (friend) => {
      // Look for the room
      let conversation = await Conversation.findOne({
        participants: { $all: [req.user.id, friend._id] }
      });

      // 🛠️ AUTO-FIX: If the collection is empty, create the room now
      if (!conversation) {
        conversation = new Conversation({
          participants: [req.user.id, friend._id],
          lastMessage: "Conversation started"
        });
        await conversation.save(); // This populates your empty collection
      }

      return {
        name: friend.name,
        academicYear: friend.academicYear,
        conversationId: conversation._id // Now this is guaranteed to exist!
      };
    }));

    res.json(friendsWithChat);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};