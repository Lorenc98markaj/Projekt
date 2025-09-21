const Vehicle = require("../models/vehicle");

// Neues Fahrzeug speichern
const createVehicle = async (req, res) => {
  try {
    const { marke, modell, baujahr, kilometerstand } = req.body;

    const newVehicle = new Vehicle({ marke, modell, baujahr, kilometerstand });
    await newVehicle.save();

    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Speichern", error });
  }
};

// Alle Fahrzeuge anzeigen
const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen", error });
  }
};

module.exports = { createVehicle, getAllVehicles };

