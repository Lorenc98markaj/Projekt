import React, { useState, useEffect } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_BASE || "http://localhost:5000";

function Trips({ vehicleId }) {
  const [trips, setTrips] = useState([]);
  const [form, setForm] = useState({ datum: "", start: "", ziel: "", zweck: "", kilometer: "" });

  useEffect(() => {
    if (vehicleId) {
      axios.get(`${API}/api/trips/vehicle/${vehicleId}`)
        .then(res => setTrips(res.data))
        .catch(err => console.error(err));
    }
  }, [vehicleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API}/api/trips`, { ...form, vehicleId });
      setTrips(prev => [...prev, data]);
      setForm({ datum: "", start: "", ziel: "", zweck: "", kilometer: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>🚗 Fahrtenbuch</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "8px", marginBottom: "16px" }}>
        <input type="date" value={form.datum} onChange={e => setForm({ ...form, datum: e.target.value })} required />
        <input placeholder="Start" value={form.start} onChange={e => setForm({ ...form, start: e.target.value })} required />
        <input placeholder="Ziel" value={form.ziel} onChange={e => setForm({ ...form, ziel: e.target.value })} required />
        <input placeholder="Zweck" value={form.zweck} onChange={e => setForm({ ...form, zweck: e.target.value })} />
        <input type="number" placeholder="Kilometer" value={form.kilometer} onChange={e => setForm({ ...form, kilometer: e.target.value })} required />
        <button type="submit">Speichern</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Datum</th>
            <th>Start</th>
            <th>Ziel</th>
            <th>Zweck</th>
            <th>Kilometer</th>
          </tr>
        </thead>
        <tbody>
          {trips.map(t => (
            <tr key={t._id}>
              <td>{new Date(t.datum).toLocaleDateString()}</td>
              <td>{t.start}</td>
              <td>{t.ziel}</td>
              <td>{t.zweck}</td>
              <td>{t.kilometer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Trips;
