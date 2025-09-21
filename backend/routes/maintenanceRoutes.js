const express = require("express");
const {
  createMaintenance,
  getAllMaintenance,
  getMaintenanceByVehicle,
  updateMaintenance,
  deleteMaintenance,
} = require("../controllers/maintenanceController");

const router = express.Router();

router.post("/", createMaintenance);
router.get("/", getAllMaintenance);
router.get("/vehicle/:vehicleId", getMaintenanceByVehicle);
router.put("/:id", updateMaintenance);
router.delete("/:id", deleteMaintenance);

module.exports = router;
