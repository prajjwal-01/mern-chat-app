const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get all messages for a specific chat (GET /api/messages/:chatId)
router.get('/:chatId', async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId });
    res.json(messages);  // Respond with all messages found for the chatId
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Send a new message (POST /api/messages)
router.post('/', async (req, res) => {
  const { sender, content, chatId } = req.body;

  try {
    const newMessage = new Message({
      sender,
      content,
      chatId,
    });
    const savedMessage = await newMessage.save();
    res.json(savedMessage);  // Respond with the newly saved message
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
