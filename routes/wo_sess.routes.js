const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/wo_sess.controller");

router.get("/", workoutController.getAllWorkoutSessions);
router.get("/:id", workoutController.getWorkoutSessionById);
router.post("/", workoutController.createWorkoutSession);
router.delete("/:id", workoutController.deleteWorkoutSession);

module.exports = router;
