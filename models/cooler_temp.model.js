const mongoose = require("mongoose");

const coolerTempSchema = new mongoose.Schema({
  device_id: { type: mongoose.Schema.Types.ObjectId, ref: "Device", required: true },
  temperature: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CoolerTemp", coolerTempSchema);
