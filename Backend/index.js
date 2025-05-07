const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const ConnectDB = require('./Database/db');
const router = require('./Router/Router');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const paymentrouter = require('./Router/PaymentRoute');

const port = process.env.PORT;
const url = process.env.db_url;

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(cookieParser());

app.use('/api', router);
app.use('/payment', paymentrouter);

app.listen(port, async () => {
  await ConnectDB(url);
  console.log(`The server is running on port:${port} Link: http://localhost:${port}`);
});
