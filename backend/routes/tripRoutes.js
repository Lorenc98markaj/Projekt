const express = require("express");
const router = express.Router();

const {
  createTrip,
  getAllTrips,
  getTripsByVehicle,
  updateTrip,
  deleteTrip
} = require("../controllers/tripController");

router.post("/", createTrip);
router.get("/", getAllTrips);
router.get("/vehicle/:vehicleId", getTripsByVehicle);
router.put("/:id", updateTrip);
router.delete("/:id", deleteTrip);

module.exports = router;
