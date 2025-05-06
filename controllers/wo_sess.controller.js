const WorkoutSession = require("../models/wo_sess.model");

exports.getAllWorkoutSessions = async (req, res) => {
  try {
    const sessions = await WorkoutSession.find()
      .populate("device_id")
      .populate("start_gps_id")
      .populate("end_gps_id");
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getWorkoutSessionById = async (req, res) => {
  try {
    const session = await WorkoutSession.findById(req.params.id)
      .populate("device_id")
      .populate("start_gps_id")
      .populate("end_gps_id");
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createWorkoutSession = async (req, res) => {
  const {
    device_id, start_gps_id, end_gps_id,
    start_time, end_time, duration,
    distance, calories_burned, average_heart_rate
  } = req.body;

  const newSession = new WorkoutSession({
    device_id,
    start_gps_id,
    end_gps_id,
    start_time,
    end_time,
    duration,
    distance,
    calories_burned,
    average_heart_rate
  });

  try {
    await newSession.save();
    res.status(201).json(newSession);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteWorkoutSession = async (req, res) => {
  try {
    const deleted = await WorkoutSession.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Session not found" });
    res.json({ message: "Workout session deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
