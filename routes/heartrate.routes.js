const express = require("express");
const router = express.Router();
const heartRateController = require("../controllers/heartrate.controllers");

router.get("/", heartRateController.getAllHeartRates);
router.get("/:id", heartRateController.getHeartRateById);
router.post("/", heartRateController.createHeartRate);
router.delete("/:id", heartRateController.deleteHeartRate);

module.exports = router;
