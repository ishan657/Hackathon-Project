require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/DB");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const notificationRoute = require("./routes/notificationRoutes");
const socketHandler = require("./socket");
const cors = require("cors");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const server = http.createServer(app);

// 1. Setup CORS Middleware
// Using a simpler setup that handles OPTIONS automatically
app.use(cors({
  origin: function (origin, callback) {
    // Allows any origin to connect
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// 2. The FIX for the crash: Use a REGEX for the options wildcard
// Instead of '*', we use /.*/ which Express 5 won't complain about
app.options(/.*/, cors());

// 3. Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: true, 
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoute);
app.use("/api/messages", messageRoutes);

// Welcome Route
app.get("/", (req, res) => {
  res.send("Campus Connect Backend is LIVE!");
});

// Initialize Socket Logic
socketHandler(io);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("!!! DETECTED ERROR !!!");
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    details: err.message,
  });
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`🚀 Server & WebSocket running on port ${PORT}`);
});