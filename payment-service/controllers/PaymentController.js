const Payment = require("../models/Payment.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
  const { userId, courseId, amount, currency, paymentType, firstName, lastName, address1, address2, city, state, zip, country } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: { userId, courseId, firstName, lastName },
    });

    const payment = new Payment({
      transactionId: paymentIntent.id,
      userId,
      courseId,
      amount,
      currency,
      paymentType,
      paymentStatus: "pending",
      firstName,
      lastName,
      address1,
      address2,
      city,
      state,
      zip,
      country,
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
