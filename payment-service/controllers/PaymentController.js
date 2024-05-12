const Payment = require("../models/Payment.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
  const { userId, courseId, amount, currency } = req.body;

  try {
    // Create a Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: { userId, courseId },
    });

    // Save payment transaction to MongoDB
    const payment = new Payment({
      transactionId: paymentIntent.id,
      userId,
      courseId,
      amount,
      currency,
      status: "pending",
    });

    await payment.save();

    res.json({
      clientSecret: paymentIntent.client_secret,
      transactionId: paymentIntent.id,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to process payment", error: error.message });
  }
};

exports.getPayment = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const payment = await Payment.findOne({ transactionId });

    if (!payment) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json(payment);
  } catch (error) {
    console.error("Error retrieving payment status:", error);
    res.status(500).json({ error: "Error retrieving payment status" });
  }
};
