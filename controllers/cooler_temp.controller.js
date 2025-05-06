const CoolerTemp = require("../models/cooler_temp.model");

exports.getAllCoolerTemps = async (req, res) => {
  try {
    const data = await CoolerTemp.find().populate("device_id");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCoolerTempById = async (req, res) => {
  try {
    const data = await CoolerTemp.findById(req.params.id).populate("device_id");
    if (!data) return res.status(404).json({ message: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCoolerTemp = async (req, res) => {
  const { device_id, temperature } = req.body;
  const newData = new CoolerTemp({ device_id, temperature });

  try {
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCoolerTemp = async (req, res) => {
  try {
    const deleted = await CoolerTemp.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Data not found" });
    res.json({ message: "Cooler temperature data deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
