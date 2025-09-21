import React, { useEffect, useState } from "react";
import { api } from "./api";
import "./App.css";
import Trips from "./Trips";
import Maintenance from "./Maintenance";

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({ marke: "", modell: "", baujahr: "", kilometerstand: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Fahrzeuge laden
  const loadVehicles = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/vehicles");
      setVehicles(data);
    } catch (e) {
      setMsg("Fehler beim Laden");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadVehicles(); }, []);

  // Formular zurücksetzen
  const resetForm = () => {
    setForm({ marke: "", modell: "", baujahr: "", kilometerstand: "" });
    setIsEditing(false);
    setEditingId(null);
  };

  // Fahrzeug speichern/aktualisieren
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      if (isEditing) {
        const { data } = await api.put(`/vehicles/${editingId}`, form);
        setVehicles((prev) => prev.map(v => v._id === editingId ? data : v));
        setMsg("Aktualisiert");
      } else {
        const { data } = await api.post("/vehicles", form);
        setVehicles((prev) => [...prev, data]);
        setMsg("Gespeichert");
      }
      resetForm();
    } catch (e) {
      setMsg("Fehler beim Speichern");
    }
  };

  // Fahrzeug bearbeiten
  const handleEdit = (v) => {
    setForm({
      marke: v.marke,
      modell: v.modell,
      baujahr: String(v.baujahr ?? ""),
      kilometerstand: String(v.kilometerstand ?? "")
    });
    setIsEditing(true);
    setEditingId(v._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fahrzeug löschen
  const handleDelete = async (id) => {
    if (!window.confirm("Wirklich loeschen?")) return;
    setMsg("");
    try {
      await api.delete(`/vehicles/${id}`);
      setVehicles((prev) => prev.filter(v => v._id !== id));
      setMsg("Geloescht");
    } catch (e) {
      setMsg("Fehler beim Loeschen");
    }
  };

  return (
    <div className="container">
      <h1>🚗 CarLog – Fahrzeuge</h1>

      {/* Formular für Fahrzeuge */}
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <input
              placeholder="Marke"
              value={form.marke}
              onChange={(e) => setForm({ ...form, marke: e.target.value })}
              required
            />
            <input
              placeholder="Modell"
              value={form.modell}
              onChange={(e) => setForm({ ...form, modell: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Baujahr"
              value={form.baujahr}
              onChange={(e) => setForm({ ...form, baujahr: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Kilometerstand"
              value={form.kilometerstand}
              onChange={(e) => setForm({ ...form, kilometerstand: e.target.value })}
              required
            />
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button className="primary" type="submit">
              {isEditing ? "Aktualisieren" : "Speichern"}
            </button>
            {isEditing && (
              <button type="button" className="secondary" onClick={resetForm}>
                Abbrechen
              </button>
            )}
          </div>
        </form>
        {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
      </div>

      {/* Fahrzeugliste */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>Liste</h2>
          <button className="secondary" onClick={loadVehicles} disabled={loading}>
            {loading ? "Laedt..." : "Neu laden"}
          </button>
        </div>

        <table className="list">
          <thead>
            <tr>
              <th>Marke</th>
              <th>Modell</th>
              <th>Baujahr</th>
              <th>Kilometer</th>
              <th style={{ textAlign: "right" }}>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(v => (
              <tr key={v._id}>
                <td>{v.marke}</td>
                <td>{v.modell}</td>
                <td>{v.baujahr}</td>
                <td>{v.kilometerstand}</td>
                <td style={{ textAlign: "right" }}>
                  <div className="actions">
                    <button className="secondary" onClick={() => handleEdit(v)}>Bearbeiten</button>
                    <button className="danger" onClick={() => handleDelete(v._id)}>Loeschen</button>
                    <button onClick={() => setSelectedVehicle(v)}>Details anzeigen</button>
                  </div>
                </td>
              </tr>
            ))}
            {vehicles.length === 0 && (
              <tr><td colSpan="5">Noch keine Fahrzeuge gespeichert.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Details: Fahrtenbuch + Wartung */}
      {selectedVehicle && (
        <div className="card" style={{ marginTop: 20 }}>
          <h2>Details für {selectedVehicle.marke} {selectedVehicle.modell}</h2>
          <Trips vehicleId={selectedVehicle._id} />
          <Maintenance vehicleId={selectedVehicle._id} />
        </div>
      )}
    </div>
  );
}

export default App;
