const mongoose = require("mongoose");

const workoutSessionSchema = new mongoose.Schema({
  device_id: { type: mongoose.Schema.Types.ObjectId, ref: "Device", required: true },
  start_gps_id: { type: mongoose.Schema.Types.ObjectId, ref: "GPS", required: true },
  end_gps_id: { type: mongoose.Schema.Types.ObjectId, ref: "GPS", required: true },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  duration: { type: String, required: true }, // Format: HH:MM:SS
  distance: { type: Number, required: true },
  calories_burned: { type: Number, required: true },
  average_heart_rate: { type: Number, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("WorkoutSession", workoutSessionSchema);
