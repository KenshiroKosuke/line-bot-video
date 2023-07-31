require("dotenv").config();
const axios = require('axios');
const { CHANNEL_ACCESS_TOKEN } = process.env;
const {BadRequestError} = require('../errors/commonErrors')

const LINE_API = {
  reply: 'https://api.line.me/v2/bot/message/reply',
  push: 'https://api.line.me/v2/bot/message/push',
  multicast: 'https://api.line.me/v2/bot/message/multicast',
  narrowCast: 'https://api.line.me/v2/bot/message/narrowcast',
  broadcast: 'https://api.line.me/v2/bot/message/broadcast'
}

module.exports.messageHandle = async (event)=>{
  console.log(event.source);
  await replyMessages(event.replyToken, [{"type":"text", "text":"Hello, รองรับไทยนะ"}])
}

module.exports.pushMessages = async(recipientId, messages, notificationDisabled=false)=>{
  // X-Line-Retry-Key = 
  if(!validateMessages(messages)){
    throw new BadRequestError("Message(s) is not in a correct format.","pushMessages")
  }else{
    return await invokeLineApi('post','push',{
      "to":recipientId,
      "messages": messages,
      'notificationDisabled': notificationDisabled
    },
    {
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`,
      }
    })
  }
}

module.exports.multicastMessages = async(recipientIdArray, messages, notificationDisabled=false)=>{ 
  if(!validateMessages(messages)){
    throw new BadRequestError("Message(s) is not in a correct format.","multicastMessages")
  }else{
    return await invokeLineApi('post','multicast',{
      "to":recipientIdArray,
      "messages": messages,
      'notificationDisabled': notificationDisabled
    },
    {
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`,
      }
    })
  }
}

module.exports.broadcastMessages = async(messages, notificationDisabled=false)=>{
  if(!validateMessages(messages)){
    throw new BadRequestError("Message(s) is not in a correct format.","broadcastMessages")
  }else{
    return await invokeLineApi('post','broadcast',{
      "messages": messages,
      'notificationDisabled': notificationDisabled
    },{
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`,
      }
    })
  }
}

const invokeLineApi = async (type,service,body,headers)=>{
  try{
    let result;
    if(type==='post'){
      result = (await axios.post(LINE_API[service],body,headers)).response
    }else if(type==='get'){
      result = (await axios.post(LINE_API[service],body,headers)).response
    }
    return result??{message: "success"}
  }catch(err){
    throw err
  }
}

const replyMessages = async (replyToken, messages, notificationDisabled=false)=>{
  // messages: [{"type":"text", "text":"Hello, user"},]
  await axios.post(LINE_API["reply"], {
    "replyToken": replyToken,
    "messages": messages,
    'notificationDisabled': notificationDisabled
  }, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`,
  }})
}

const validateMessages = (messages)=>{
  if(messages.length > 5){
    return false
  }
  for (const message of messages){
    if(!message.type){
      return false;
    }
    switch (message.type) {
      case "text":
        if (!message.text){
          return false
        }
        break;
      case "video":
        if(!message.originalContentUrl || !message.previewImageUrl){
          return false
        }
      default:
        break;
    }
  }
  return true
}