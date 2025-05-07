const express = require('express');
const { createPayment, verifyPayment } = require('../Control/Finance');
const paymentrouter = express.Router();

paymentrouter.post('/pay', createPayment);
paymentrouter.post('/verify', verifyPayment);

module.exports = paymentrouter;
