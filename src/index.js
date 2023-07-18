const dotenv = require('dotenv')
const express = require('express');
const cookieParser = require('cookie-parser');

dotenv.config({ path: '.env' });
const app = express();

app.use(express.json())
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send(`<h1>Hello from express</h1>`);
});
app.get('/hello', (req, res) => {
  res.send(`Hello World!`);
});

const BACKEND_PORT = process.env.BACKEND_PORT || 3000;
const server = app.listen(BACKEND_PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${BACKEND_PORT}`))