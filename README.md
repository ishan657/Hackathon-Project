# 🚀 CAMPUS CONNECT

**CAMPUS CONNECT** is a specialized real-time networking and secure communication platform built exclusively for students. It leverages AI-driven matching and end-to-end encrypted messaging to help students find their community and collaborate without compromising privacy.

---

## 👥 The Developers

This project was conceptualized and developed by two students from **NIT Agartala**:

- **Bitik**
- **Ishan**

---

## 🌟 Core Features

### 1. AI-Powered Student Matching

The platform uses **Gemini AI** to bridge the gap between students by analyzing profiles and interests.

- **Dashboard Recommendations**: Suggests relevant peers based on profile data and academic year.
- **Match Insights**: Provides transparency by explaining why students were paired, focusing on shared goals and compatibility.

### 2. End-to-End Encrypted (E2EE) Chat

Privacy is a core pillar of the platform. All personal communication is protected using military-grade encryption.

- **AES-256 Encryption**: Messages are encrypted locally using `crypto-js` before being transmitted to the server.
- **Unique IVs**: Every message uses a random Initialization Vector (IV) to prevent pattern recognition in encrypted data.
- **Zero-Knowledge Architecture**: The server only stores "garbled" text; decryption keys never leave the user's device.

### 3. Real-Time Communication

The messaging engine is built on **Socket.io** for a lag-free experience.

- **Private Room Logic**: Automatically creates isolated socket rooms for every unique pair of students.
- **Instant Delivery**: Messages appear in real-time, complete with "Send Hi" quick-actions upon request acceptance.
- **Global Debugging**: Integrated event detection logs to monitor connection health and broadcast attempts.

### 4. Smart Notification Engine

A robust system designed to manage social interactions efficiently.

- **partner Requests**: Real-time alerts for incoming connection requests.
- **Flicker-Free UX**: Employs a local "UI Lock" (processing IDs) to ensure that when a request is accepted, the UI stays in the "Send Hi" state while the database synchronizes.
- **Unread Indicators**: Visual badges (emerald dots) on the chat icon alert users to new incoming messages.

### 5. Secure Onboarding & Customization

- **JWT Authentication**: Secure user sessions using JSON Web Tokens.
- **Student Onboarding**: A detailed flow to capture academic years, bios, and "Looking For" tags to improve AI matching accuracy.
- **Dynamic Themes**: Full Light and Dark mode support with persistent theme state.

---

## 🛠️ Tech Stack

| Layer              | Technology                           |
| :----------------- | :----------------------------------- |
| **Frontend**       | React.js, Tailwind CSS, Lucide Icons |
| **Backend**        | Node.js, Express.js                  |
| **Database**       | MongoDB with Mongoose                |
| **Real-time**      | Socket.io                            |
| **Security**       | AES-256 Encryption (Crypto-JS)       |
| **AI Integration** | Google Gemini                        |

---

## 📂 Repository Highlights

- **`src/components/chat/ChatInterface.jsx`**: The core chat engine managing E2EE, socket listeners, and history fetching.
- **`backend/socket.js`**: Server-side socket handler for room management and message broadcasting.
- **`backend/models/Message.js`**: Schema for storing encrypted payloads and IV strings.
- **`src/components/Navbar.jsx`**: Real-time notification hub and theme manager.

---

## 🔧 Setup and Installation

1. **Clone the Repository**:
   ```bash
   git clone [https://github.com/ishan657/Hackathon-Project]
   ```
