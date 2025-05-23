const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password_hash: {
    type: String,
    required: true
  },
  height: Number,
  weight: Number,
  sos_contact: Number,
  timestamp: { type: Date, default: Date.now } });

module.exports = mongoose.model("User", userSchema);
