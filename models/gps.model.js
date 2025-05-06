const mongoose = require("mongoose");

const gpsSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  {
    timestamps: true  // Menambahkan createdAt dan updatedAt secara otomatis
  }
);

module.exports = mongoose.model("GPS", gpsSchema);
