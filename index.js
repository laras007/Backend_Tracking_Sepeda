const express = require('express');
const mongoose = require('mongoose');
const User = require('/models/User');

const app = express();
app.use(express.json()); // Biar bisa parsing JSON

// Koneksi MongoDB
mongoose.connect('mongodb://localhost:27017/db_sepeda', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Terkoneksi ke MongoDB");
}).catch(err => {
  console.error("❌ Gagal konek MongoDB:", err);
});

// Tes endpoint buat create user
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log('Server berjalan di http://localhost:5000');
});
