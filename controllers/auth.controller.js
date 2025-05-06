const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
console.log("JWT_SECRET:", JWT_SECRET);


exports.register = async (req, res) => {
  const { name, email, password, height, weight, sos_contact } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email sudah terdaftar" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password_hash: hashedPassword,
      height,
      weight,
      sos_contact
    });

    await user.save();

    res.status(201).json({ message: "Registrasi berhasil" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Email tidak ditemukan" });
  
      console.log("Password yang diterima:", password); // Log password yang diterima
  
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) return res.status(400).json({ message: "Password salah" });
  
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
  
      res.json({
        message: "Login berhasil",
        token,
        user: { id: user._id, name: user.name, email: user.email }
      });
    } catch (err) {
      console.log('Error during login:', err); // Log error
      res.status(500).json({ message: err.message });
    }
  };
  
  