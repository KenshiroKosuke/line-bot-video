const dotenv = require("dotenv");
const express = require("express");
// const https = require("https");
// const fs = require("fs");
const cookieParser = require("cookie-parser");
const { messageHandle } = require("./functions/messageHandler");

dotenv.config({ path: ".env" });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/auth", require("./routes/auth"));
app.use("/message",require('./routes/message'))
app.get("/", (req, res) => {
  res.send(`<h1>Hello from express</h1>`);
});
app.post("/webhook", async (req, res) => {
  console.log(req.body);
  await Promise.all( req.body.events.map(async (event)=>{
    if (event.type === "message") {
      return await messageHandle(event)
    }else{
      return;
    }
  }))
  res.sendStatus(200)
});
app.use(require("./middlewares/errorHandler"))

const BACKEND_PORT = process.env.BACKEND_PORT || 3001;
// const key = fs.readFileSync("localhost-key.pem", "utf-8");
// const cert = fs.readFileSync("localhost.pem", "utf-8");
// https.createServer({ key, cert }, app).listen(BACKEND_PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${BACKEND_PORT}`));
const server = app.listen(
  BACKEND_PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${BACKEND_PORT}`
  )
);
