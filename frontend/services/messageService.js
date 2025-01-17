import axios from 'axios';

const API_URL = '/api/messages';

export const fetchMessages = async (chatId) => {
  try {
    const response = await axios.get(`${API_URL}/${chatId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

export const sendMessage = async (messageData) => {
  try {
    const response = await axios.post(API_URL, messageData);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
  }
};
