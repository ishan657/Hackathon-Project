require('dotenv').config();
const express = require('express');
const http = require('http'); // Required for WebSockets
const { Server } = require('socket.io'); // Socket.io server
const connectDB = require('./config/DB');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const notificationRoute = require('./routes/notificationRoutes');
const socketHandler = require('./socket'); // Your new socket logic file
const cors = require('cors');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Your React URL
  credentials: true
}));
const server = http.createServer(app); // Wrap express app

// Initialize Socket.io with CORS safety
const io = new Server(server, {
  cors: {
    origin: "*", // In production, replace with your frontend URL
    methods: ["GET", "POST"]
  }
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications',notificationRoute);
app.use('/api/messages', messageRoutes);

// Initialize Socket Logic
socketHandler(io);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("!!! DETECTED ERROR !!!");
  console.error(err.stack); 
  res.status(500).json({ 
    error: "Internal Server Error", 
    details: err.message 
  });
});

const PORT = process.env.PORT || 5000;

// IMPORTANT: Listen on 'server', not 'app'
server.listen(PORT, () => {
  console.log(`🚀 Server & WebSocket running on port ${PORT}`);
});