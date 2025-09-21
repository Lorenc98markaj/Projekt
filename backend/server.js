const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB verbinden
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB verbunden"))
  .catch((err) => console.error("❌ Fehler bei Verbindung:", err));

// vehicle-Routen
const vehicleRoutes = require("./routes/vehicleroutes");
app.use("/api/vehicles", vehicleRoutes);

// Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:3000",              
  process.env.FRONTEND_URL              
];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error("Nicht erlaubte Herkunft: " + origin), false);
  }
}));
const Port = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server auf Port ${PORT}`));
const tripRoutes = require("./routes/tripRoutes");
app.use("/api/trips", tripRoutes);
const maintenanceRoutes = require("./routes/maintenanceRoutes");

// ...
app.use("/api/maintenance", maintenanceRoutes);
