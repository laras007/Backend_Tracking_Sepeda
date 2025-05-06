const express = require("express");
const router = express.Router();
const gpsController = require("../controllers/gps.controller");
const authMiddleware = require("../authMiddleware"); // Import middleware

// Tambah data GPS - hanya untuk user yang sudah login
router.post("/add", authMiddleware, gpsController.addGPSData);

// Hitung jarak GPS - user_id diambil dari token
router.get("/distance", authMiddleware, gpsController.calculateDistance);

module.exports = router;
