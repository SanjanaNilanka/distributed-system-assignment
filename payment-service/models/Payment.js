const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  transactionId: { type: String, required: true },
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  paymentType: { type: String, required: true },
  paymentStatus: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String, required: true },
  country: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", PaymentSchema);

