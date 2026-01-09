const Message = require("./models/Message");
const Conversation = require("./models/Conversation");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("⚡ NEW CONNECTION:", socket.id);

    // 🔥 THE GLOBAL DEBUGGER: This logs EVERYTHING hitting the server
    socket.onAny((eventName, payload) => {
      console.log(`📡 EVENT DETECTED: [${eventName}] | Data:`, payload);
    });

    // 1. Join a private conversation room
    socket.on("join_room", (data) => {
      // Handles both {"conversationId": "..."} and direct string "..."
      const conversationId = typeof data === "string" ? data : data.conversationId;

      if (!conversationId) {
        console.log("❌ JOIN FAILED: No ID provided in payload");
        return;
      }

      const room = String(conversationId).trim();
      socket.join(room);
      console.log(`✅ SUCCESS: Socket ${socket.id} joined room: [${room}]`);
    });
    // Example: When a user rejects a request
socket.on("respond_to_request", async (data) => {
  const { requestId, status, senderId, recipientId } = data;

  // 1. Logic to update the Request record in DB...

  // 2. Create the Notification in DB
  const update = new Notification({
    recipient: senderId, // The person who originally sent the request
    sender: recipientId,  // You (the one rejecting/accepting)
    type: status === 'rejected' ? 'REQUEST_REJECTED' : 'REQUEST_ACCEPTED',
    content: `Your request was ${status} by the student.`
  });
  await update.save();

  // 3. Emit live to the recipient if they are online
  io.to(senderId.toString()).emit("new_update", update);
});

    // 2. Handle sending a live message
    socket.on("send_message", async (data) => {
      const { conversationId, sender, encryptedText, iv } = data;
      const room = String(conversationId).trim();

      // Check how many people are in the room BEFORE emitting
      const clients = io.sockets.adapter.rooms.get(room);
      const roomSize = clients ? clients.size : 0;
      console.log(`📩 Broadcast Attempt: Room [${room}] | Active Users: ${roomSize}`);

      // Broadcast to EVERYONE in the room
      io.to(room).emit("receive_message", {
        sender,
        encryptedText,
        iv,
        createdAt: new Date(),
      });

      try {
        const newMessage = new Message({ conversationId: room, sender, encryptedText, iv });
        await newMessage.save();
        await Conversation.findByIdAndUpdate(room, { lastMessage: encryptedText });
        console.log("💾 Database: Message Saved.");
      } catch (err) {
        console.error("❌ Database Error:", err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ DISCONNECTED:", socket.id);
    });
  });
};

module.exports = socketHandler;