import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

// Establish the Socket.IO connection
const socket = io('http://localhost:5000');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Listen for incoming messages from the server
  useEffect(() => {
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup the listener on unmount
    return () => socket.off('receiveMessage');
  }, []);

  // Function to send a message through Socket.IO
  const sendMessage = () => {
    if (message.trim() !== '') {
      // Emit the message to the server
      socket.emit('sendMessage', { content: message });
      setMessage(''); // Clear the input field
    }
  };

  // Fetch existing messages from the backend
  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/messages');
      setMessages(response.data); // Assuming response.data is an array of messages
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <h1>Chat App</h1>
      {/* Render all messages */}
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.content}</p> // Assuming each message object has a "content" field
        ))}
      </div>

      {/* Input field and send button */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
