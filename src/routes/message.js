const express = require("express");
const router = express.Router();
const {
  pushMessages,
  broadcastMessages,
} = require("../functions/messageHandler");
const youtubeUtil = require("../functions/utils/youtube");

router.post("/broadcast/youtube/low-quality", async (req, res, next) => {
  let { messages, notificationDisabled=false, useDefaultYoutubeThumbnail } = req.body;
  try {
    const modifiedMessages = await Promise.all(
      messages.map(async (message) => {
        if (useDefaultYoutubeThumbnail || !message.previewImageUrl)
          message.previewImageUrl = youtubeUtil.getThumbnail(
            message.originalContentUrl
          );
        const videoFormat = await youtubeUtil.selectVideoFormat(
          message.originalContentUrl
        );
        message.originalContentUrl = videoFormat.url;
        return message;
      })
    );
    const result = await broadcastMessages(
      modifiedMessages,
      notificationDisabled
    );
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.post("/push", async (req, res, next) => {
  const { messages, recipientId, notificationDisabled=false } = req.body;
  try {
    const result = await pushMessages(
      recipientId,
      messages,
      notificationDisabled
    );
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.post("/broadcast", async (req, res, next) => {
  const { messages, notificationDisabled=false } = req.body;
  try {
    const result = await broadcastMessages(
      messages,
      notificationDisabled
    );
    res.send(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
