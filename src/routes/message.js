const express = require('express')
const router = express.Router();
const {pushMessages, broadcastMessages} = require('../functions/messageHandler')

router.post("/push", async (req, res, next) => {
  const {messages,recipientId,notificationDisabled} = req.body
  try {
    const result = await pushMessages(recipientId,messages,notificationDisabled??false)
    res.send(result)
  } catch (err) {
    next(err);
  }
});
router.post("/broadcast", async (req, res, next) => {
  const {messages,notificationDisabled} = req.body
  try {
    const result = await broadcastMessages(messages,notificationDisabled??false)
    res.send(result)
  } catch (err) {
    next(err);
  }
});

module.exports = router