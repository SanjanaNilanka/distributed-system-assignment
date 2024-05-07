const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  transactionId: { type: String, required: true },
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", PaymentSchema);
