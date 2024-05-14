const express = require("express");
const PaymentController = require("../controllers/PaymentController.js");

const router = express.Router();

router.post("/processPayment", PaymentController.processPayment);
router.get("/get/:transactionId", PaymentController.getPayment);

module.exports = router;