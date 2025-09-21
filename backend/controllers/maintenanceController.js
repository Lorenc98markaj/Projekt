const Maintenance = require("../models/maintenance");

// Neue Wartung/Tankvorgang speichern
const createMaintenance = async (req, res) => {
  try {
    const { vehicleId, typ, datum, kosten, beschreibung, kilometer } = req.body;
    const newEntry = new Maintenance({ vehicleId, typ, datum, kosten, beschreibung, kilometer });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Speichern", error });
  }
};

// Alle Einträge abrufen
const getAllMaintenance = async (req, res) => {
  try {
    const entries = await Maintenance.find().populate("vehicleId", "marke modell");
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen", error });
  }
};

// Alle Einträge eines Fahrzeugs
const getMaintenanceByVehicle = async (req, res) => {
  try {
    const entries = await Maintenance.find({ vehicleId: req.params.vehicleId });
    res.json(entries);
  } catch (error) {
    res.status(400).json({ message: "Fehler beim Abrufen", error });
  }
};

// Eintrag aktualisieren
const updateMaintenance = async (req, res) => {
  try {
    const updated = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Nicht gefunden" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Update fehlgeschlagen", error });
  }
};

// Eintrag löschen
const deleteMaintenance = async (req, res) => {
  try {
    const deleted = await Maintenance.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Nicht gefunden" });
    res.json({ message: "Eintrag gelöscht" });
  } catch (error) {
    res.status(400).json({ message: "Löschen fehlgeschlagen", error });
  }
};

module.exports = {
  createMaintenance,
  getAllMaintenance,
  getMaintenanceByVehicle,
  updateMaintenance,
  deleteMaintenance,
};
