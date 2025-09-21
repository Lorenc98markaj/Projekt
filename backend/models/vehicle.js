const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  marke: { type: String, required: true },
  modell: { type: String, required: true },
  baujahr: { type: Number, required: true },
  kilometerstand: { type: Number, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model("vehicle", vehicleSchema);

