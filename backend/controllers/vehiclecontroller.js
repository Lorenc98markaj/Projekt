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

// Alle Fahrzeuge abrufen
const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen", error });
  }
};

// Ein Fahrzeug abrufen
const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Nicht gefunden" });
    res.json(vehicle);
  } catch (error) {
    res.status(400).json({ message: "Ungueltige ID", error });
  }
};

// Fahrzeug aktualisieren
const updateVehicle = async (req, res) => {
  try {
    const { marke, modell, baujahr, kilometerstand } = req.body;
    const updated = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { marke, modell, baujahr, kilometerstand },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Nicht gefunden" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Update fehlgeschlagen", error });
  }
};

// Fahrzeug löschen
const deleteVehicle = async (req, res) => {
  try {
    const deleted = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Nicht gefunden" });
    res.json({ message: "Geloescht", id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Loeschen fehlgeschlagen", error });
  }
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
