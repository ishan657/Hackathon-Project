require('dotenv').config();
const express = require('express');
const http = require('http'); 
const { Server } = require('socket.io'); 
const connectDB = require('./config/DB');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const notificationRoute = require('./routes/notificationRoutes');
const socketHandler = require('./socket'); 
const cors = require('cors');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    callback(null, true);
  },
  credentials: true
}));

const io = new Server(server, {
  cors: {
    // This function tells the socket to accept ANY origin that hits it
    origin: (origin, callback) => {
      callback(null, true);
    },
    methods: ["GET", "POST"],
    credentials: true
  },
  allowEIO3: true // Helps with version compatibility
});

const server = http.createServer(app); 

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoute);
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

// 3. FIX: Use Render's dynamic port or default to 5001 for local dev
const PORT = process.env.PORT || 5001;

// IMPORTANT: Listen on 'server', not 'app'
server.listen(PORT, () => {
  console.log(`🚀 Server & WebSocket running on port ${PORT}`);
});