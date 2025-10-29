const mongoose = require("mongoose");

// Step 1: Define the schema (structure of the document)
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // name must be provided
    },
    email: {
      type: String,
      required: true,
      unique: true,   // no duplicate emails
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      min: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true // adds createdAt and updatedAt automatically
  }
);

// Step 2: Create and export the model
module.exports = mongoose.model("Users", userSchema);
