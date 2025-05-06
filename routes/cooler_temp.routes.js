const express = require("express");
const router = express.Router();
const coolerTempController = require("../controllers/cooler_temp.controller");

router.get("/", coolerTempController.getAllCoolerTemps);
router.get("/:id", coolerTempController.getCoolerTempById);
router.post("/", coolerTempController.createCoolerTemp);
router.delete("/:id", coolerTempController.deleteCoolerTemp);

module.exports = router;
