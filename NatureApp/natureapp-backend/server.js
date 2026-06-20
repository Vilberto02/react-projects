import cors from "cors";
import express from "express";
import mongoose from "mongoose";
// ── Módulos de Rutas (Arquitectura Modular) ──
import cartRoutes from "./routes/cartRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = 9090;

// ── Middleware Global ──
app.use(cors());
app.use(express.json());

// ── Conexión a Base de Datos ──
mongoose
  .connect("mongodb://localhost:27017/natureapp")
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error de conexión:", err));

// ── Registro de Endpoints (RESTful API) ──
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

// ── Endpoint de Health Check ──
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// ── Middleware de Manejo de Errores ──
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Error interno del servidor",
  });
});
app.listen(PORT, () => {
  console.log(`Servidor NaturApp en puerto ${PORT}`);
});
