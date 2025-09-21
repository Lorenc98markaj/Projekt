import React, { useEffect, useState } from "react";
import { api } from "./api";

function Maintenance({ vehicleId }) {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ datum: "", typ: "", details: "", kosten: "" });
  const [msg, setMsg] = useState("");

  // Wartungs- & Tankhistorie laden
  const loadEntries = async () => {
    try {
      const { data } = await api.get(`/maintenance/vehicle/${vehicleId}`);
      setEntries(data);
    } catch (e) {
      setMsg("Fehler beim Laden der Historie");
    }
  };

  useEffect(() => {
    if (vehicleId) loadEntries();
  }, [vehicleId]);

  // Neue Wartung speichern
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const { data } = await api.post("/maintenance", { ...form, vehicleId });
      setEntries((prev) => [...prev, data]);
      setMsg("Eintrag gespeichert");
      setForm({ datum: "", typ: "", details: "", kosten: "" });
    } catch (e) {
      setMsg("Fehler beim Speichern");
    }
  };

  return (
    <div>
      <h3>🛠️ Wartungs- & Tankhistorie</h3>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="date"
          value={form.datum}
          onChange={(e) => setForm({ ...form, datum: e.target.value })}
          required
        />
        <input
          placeholder="Typ (Ölwechsel, Tanken, Service...)"
          value={form.typ}
          onChange={(e) => setForm({ ...form, typ: e.target.value })}
          required
        />
        <input
          placeholder="Details"
          value={form.details}
          onChange={(e) => setForm({ ...form, details: e.target.value })}
        />
        <input
          type="number"
          placeholder="Kosten"
          value={form.kosten}
          onChange={(e) => setForm({ ...form, kosten: e.target.value })}
        />
        <button type="submit" className="primary">Speichern</button>
      </form>

      {msg && <p>{msg}</p>}

      <table className="list">
        <thead>
          <tr>
            <th>Datum</th>
            <th>Typ</th>
            <th>Details</th>
            <th>Kosten</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(e => (
            <tr key={e._id}>
              <td>{new Date(e.datum).toLocaleDateString()}</td>
              <td>{e.typ}</td>
              <td>{e.details}</td>
              <td>{e.kosten} €</td>
            </tr>
          ))}
          {entries.length === 0 && (
            <tr><td colSpan="4">Noch keine Einträge vorhanden.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Maintenance;
