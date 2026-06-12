const axios = require('axios');

// This service is responsible for sending notifications
// You can integrate Telegram Bot API or WhatsApp Business API here

exports.sendNotification = async (tenantId, message) => {
  try {
    console.log(`[Notification to Tenant ${tenantId}]: ${message}`);
    
    // Example Telegram Integration (requires BOT_TOKEN and CHAT_ID in env)
    // const token = process.env.TELEGRAM_BOT_TOKEN;
    // const chatId = process.env.TELEGRAM_CHAT_ID;
    // if (token && chatId) {
    //   await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
    //     chat_id: chatId,
    //     text: message
    //   });
    // }
    
  } catch (error) {
    console.error('Failed to send notification:', error.message);
  }
};
