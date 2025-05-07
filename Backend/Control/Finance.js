const Razorpay = require('razorpay');
const crypto = require('crypto');
const contribute = require('../Model/Contribute');
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

createPayment = async (req, res) => {
  const { Contributer, Amount, Contact, Message } = req.body;
  try {
    const options = {
      amount: Amount * 100, // INR to paisa
      currency: 'INR',
      receipt: 'order_rcptid_' + Date.now(),
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const newOrder = await contribute.create({
      Contributer,
      Contact,
      Amount,
      Message,
      razorpayOrderId: razorpayOrder.id, // Save the Razorpay order ID
      status: 'PENDING',
    });

    res.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create order', error: err.message });
  }
};

verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  if (generatedSignature === razorpay_signature) {
    try {
      const order = await contribute.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: 'PAID', razorpayPaymentId: razorpay_payment_id },
        { new: true }
      );
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      res.json({ message: 'Payment verified successfully', order });
    } catch (err) {
      res.status(500).json({ message: 'Database update failed', error: err.message });
    }
  } else {
    res.status(400).json({ message: 'Payment verification failed' });
  }
};

module.exports = { createPayment, verifyPayment };
