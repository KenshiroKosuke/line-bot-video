const express = require('express')
const router = express.Router();
const {pushMessages, broadcastMessages} = require('../functions/messageHandler')

router.post("/push", async (req, res, next) => {
  const {messages,recipientId} = req.body
  try {
    const result = await pushMessages(recipientId,messages)
    res.send(result)
  } catch (err) {
    next(err);
  }
});
router.post("/broadcast", async (req, res, next) => {
  const {messages} = req.body
  try {
    const result = await broadcastMessages(messages)
    res.send(result)
  } catch (err) {
    next(err);
  }
});

module.exports = router