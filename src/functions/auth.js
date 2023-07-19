require("dotenv").config();
const jose = require("node-jose");
const axios = require('axios');
const { PRIVATE_KEY, KID } = process.env;

module.exports.issueChannelAccessToken = async () => {
  const jwtToken = await generateJWTToken()
  // expires in 30 days
  const result = await axios.post('https://api.line.me/oauth2/v2.1/token', {
    grant_type: 'client_credentials',
    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    client_assertion: jwtToken,
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  console.log(result.data);
  return result.data
}

const generateJWTToken = async () => {
  const privateKey = PRIVATE_KEY
  const header = {
    alg: "RS256",
    typ: "JWT",
    kid: KID,
  };
  const payload = {
    iss: "2000162572", // channel ID
    sub: "2000162572", // channel ID
    aud: "https://api.line.me/",
    exp: Math.floor(new Date().getTime() / 1000) + 60 * 30,
    token_exp: 60 * 60 * 24 * 30,
  };
  const jwtToken = await jose.JWS.createSign(
    { format: "compact", fields: header },
    JSON.parse(privateKey)
  ).update(JSON.stringify(payload)).final()
  return jwtToken
};
