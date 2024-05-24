/// Import required modules
const mongoose = require("mongoose");
const validator = require("validator");

// Define the candidate schema
const candidateSchema = new mongoose.Schema(
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
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create Candidate model using the schema
const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
