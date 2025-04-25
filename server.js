const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const HeartRate = require("./models/heartrate");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Koneksi ke MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Terhubung ke MongoDB Atlas"))
.catch(err => console.error("❌ Gagal koneksi MongoDB:", err));
console.log("MongoDB URI:", process.env.MONGODB_URI);
 // ⬅️ Harus tampil sebagai string URL

// Endpoint root
app.get("/", (req, res) => {
  res.send("🚴‍♀️ Backend Sepeda - Heart Rate Service");
});

// Endpoint POST untuk menerima data heart rate dari ESP32
app.post("/heartrate", async (req, res) => {
  try {
    const { device_id, bpm } = req.body;

    if (!device_id || typeof bpm !== 'number') {
      return res.status(400).send("Data tidak valid");
    }

    const newData = new HeartRate({ device_id, bpm });
    await newData.save();
    res.status(201).send("✅ Heart rate berhasil disimpan");
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).send("Terjadi kesalahan di server");
  }
});

// Mulai server
app.listen(PORT, () => {
  console.log(`🚀 Server aktif di http://localhost:${PORT}`);
});
