const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  typ: { type: String, required: true }, // z.B. Ölwechsel, Service, Tankfüllung
  datum: { type: Date, required: true },
  kosten: { type: Number }, // optional
  beschreibung: { type: String }, // Details
  kilometer: { type: Number }, // bei welchem Kilometerstand
}, { timestamps: true });

module.exports = mongoose.model("Maintenance", maintenanceSchema);
