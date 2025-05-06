const mongoose = require("mongoose");

const heartRateSchema = new mongoose.Schema({
  device_id: { type: mongoose.Schema.Types.ObjectId, ref:"Device", required: true },
  bpm: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
}, { collection: "Heart_Rate" });

module.exports = mongoose.model("Heart_Rate", heartRateSchema);
