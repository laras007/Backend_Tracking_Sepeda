const HeartRate = require("../models/heartrate.model");

exports.getAllHeartRates = async (req, res) => {
  try {
    const data = await HeartRate.find().populate("device_id");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getHeartRateById = async (req, res) => {
  try {
    const data = await HeartRate.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createHeartRate = async (req, res) => {
  const { device_id, bpm } = req.body;
  const data = new HeartRate({ device_id, bpm });

  try {
    await data.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteHeartRate = async (req, res) => {
  try {
    const data = await HeartRate.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: "Data not found" });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
