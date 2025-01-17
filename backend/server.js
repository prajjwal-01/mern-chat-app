const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db'); // Import the connectDB function
const messageRoutes = require('./routes/messageRoutes'); // Import the message routes

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Debugging: Indicate server is initializing
console.log('Initializing server...');

// Connect to MongoDB
connectDB(); // Call the connectDB function

// Middleware
app.use(cors());
app.use(express.json());

// Debugging: Log when middleware is applied
console.log('Middleware initialized.');

// Register the message routes
app.use('/api/messages', messageRoutes); // Ensure this is registered correctly
console.log('Message routes registered.');

// Root route to confirm server is running
app.get('/', (req, res) => {
  console.log('Root route accessed.'); // Log when the root route is accessed
  res.send('API is running...');
});

// Socket.IO Connection
io.on('connection', (socket) => {
  console.log('A user connected with socket ID:', socket.id);

  socket.on('sendMessage', (message) => {
    console.log(`Message received: ${JSON.stringify(message)}`); // Log the message details
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log(`User with socket ID ${socket.id} disconnected.`);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log when the server starts
});
