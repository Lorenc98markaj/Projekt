const Trip = require("../models/trip");

// Neue Fahrt speichern
const createTrip = async (req, res) => {
  try {
    const { vehicleId, datum, start, ziel, zweck, kilometer } = req.body;
    const newTrip = new Trip({ vehicleId, datum, start, ziel, zweck, kilometer });
    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Speichern der Fahrt", error });
  }
};

// Alle Fahrten abrufen
const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find().populate("vehicleId", "marke modell");
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen", error });
  }
};

// Fahrten eines bestimmten Fahrzeugs abrufen
const getTripsByVehicle = async (req, res) => {
  try {
    const trips = await Trip.find({ vehicleId: req.params.vehicleId });
    res.json(trips);
  } catch (error) {
    res.status(400).json({ message: "Fehler beim Abrufen", error });
  }
};

// Fahrt aktualisieren
const updateTrip = async (req, res) => {
  try {
    const updated = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Fahrt nicht gefunden" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Update fehlgeschlagen", error });
  }
};

// Fahrt löschen
const deleteTrip = async (req, res) => {
  try {
    const deleted = await Trip.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Fahrt nicht gefunden" });
    res.json({ message: "Fahrt gelöscht", id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Löschen fehlgeschlagen", error });
  }
};

module.exports = {
  createTrip,
  getAllTrips,
  getTripsByVehicle,
  updateTrip,
  deleteTrip,
};
