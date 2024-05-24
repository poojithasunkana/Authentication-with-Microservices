// Import required modules
const mongoose = require("mongoose");
const validator = require("validator");

// define user schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    passwordHash: {
      type: String,
      required: [true, "Please provide a password"],
    },
  },
  { timestamps: true }
);
// creating user model using user schema
const User = mongoose.model("User", userSchema);
module.exports = User;
