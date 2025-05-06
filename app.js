require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes")

const heartrateRoutes = require ("./routes/heartrate.routes")
const gpsRoutes = require("./routes/gps.routes");
const authRoutes = require("./routes/auth.routes")



const coolerTempRoutes = require("./routes/cooler_temp.routes");
const workoutSessionRoutes = require("./routes/wo_sess.routes");





const app = express();
app.use(express.json());

// Connect ke MongoDB Atlas
connectDB();

// Routes
app.use("/api/users", userRoutes );

app.use("/api/heartrate", heartrateRoutes);
app.use("/api/gps", gpsRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/cooler-temps", coolerTempRoutes);
app.use("/api/workout-sessions", workoutSessionRoutes);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));