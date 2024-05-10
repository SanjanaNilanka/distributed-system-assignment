const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//static enrollment
userSchema.statics.enrol = async function (name, email, phone) {
  //validation
  if (!name || !email || !phone) {
    throw Error("All fields must be filled");
  }

  function isValidPhoneNumber(phone) {
    return /^\+?\d{9,15}$/.test(phone);
  }

  if (!isValidPhoneNumber(phone)) {
    throw Error("Phone number is not valid");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!isValidPhoneNumber(phone)) {
    throw Error("Phone number is not valid");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const user = await this.create({
    name,
    email,
    phone,
  });

  return user;
};
module.exports = mongoose.model("User", userSchema);
