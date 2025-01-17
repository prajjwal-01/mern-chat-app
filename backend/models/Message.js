const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    chatId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
