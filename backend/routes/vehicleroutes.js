const express = require("express");
const router = express.Router();
const { createVehicle, getAllVehicles } = require("../controllers/vehiclecontroller");

router.post("/", createVehicle);       // POST: neues Fahrzeug speichern
router.get("/", getAllVehicles);       // GET: alle Fahrzeuge anzeigen

module.exports = router;
