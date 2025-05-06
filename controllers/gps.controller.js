const GPS = require("../models/gps.model");
const { calculateTotalDistance } = require("../utils/distance");
const { getRouteDistanceFromORS } = require("../utils/ors");

exports.addGPSData = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const user_id = req.user.id; // Ambil dari token

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Latitude dan longitude harus diisi" });
    }

    const newGPS = new GPS({
      user_id,
      latitude,
      longitude,
    });

    await newGPS.save();
    res.status(201).json({ message: "Data GPS berhasil disimpan", data: newGPS });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.calculateDistance = async (req, res) => {
  try {
    const user_id = req.user.id;
    const gpsData = await GPS.find({ user_id }).sort({ createdAt: 1 });

    if (gpsData.length < 2) {
      return res.status(400).json({ message: "Data GPS tidak cukup untuk menghitung jarak" });
    }

    const coordinates = gpsData.map(point => ({
      latitude: point.latitude,
      longitude: point.longitude,
    }));

    const distance = await getRouteDistanceFromORS(coordinates);
    res.json({ user_id, distance_km: distance.toFixed(2) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};