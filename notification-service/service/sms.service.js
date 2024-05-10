const twilio = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.sendSMS = async (to, message) => {
  try {
    await twilio.messages.create({
      body: message,
      to,
      from: process.env.TWILIO_PHONE_NUMBER,
    });
    console.log("SMS sent successfully");
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};
