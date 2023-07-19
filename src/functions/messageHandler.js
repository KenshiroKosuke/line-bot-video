require("dotenv").config();
const axios = require('axios');
const { CHANNEL_ACCESS_TOKEN } = process.env;

const LINE_API = {
  reply: 'https://api.line.me/v2/bot/message/reply',
  push: 'https://api.line.me/v2/bot/message/push'
}

module.exports.messageHandle = async (event)=>{
  await replyMessages(event.replyToken, [{"type":"text", "text":"Hello, รองรับไทยนะ"}])
}

const replyMessages = async (replyToken, messages)=>{
  // messages: [{"type":"text", "text":"Hello, user"},]
  await axios.post(LINE_API["reply"], {
    "replyToken": replyToken,
    "messages": messages
}, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
  }
})
}