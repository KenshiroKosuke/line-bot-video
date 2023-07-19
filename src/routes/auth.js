const express = require('express')
const router = express.Router();
const {generateJWTToken, issueChannelAccessToken} = require('../functions/auth')

router.get("/generate-token", async (req, res, next) => {
  try {
    const token =  await issueChannelAccessToken()
    res.send(token)
  } catch (err) {
    next(err);
  }
});

module.exports = router