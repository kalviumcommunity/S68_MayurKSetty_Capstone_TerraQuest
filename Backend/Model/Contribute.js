const mongoose = require('mongoose');

const contributeSchema = new mongoose.Schema({
  Contributer: { type: String, required: true },
  Contact: { type: Number, required: true },
  Amount: { type: Number, required: true },
  Message: { type: String, default: 'None' },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  status: { type: String, default: 'PENDING' },
});

const contribute = mongoose.model('contribute', contributeSchema);

module.exports = contribute;
