const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const products = [
  {
    id: "1",
    name: "Maca Negra Orgánica",
    description:
      "La maca negra es conocida por aumentar la energía y resistencia.",
    price: 45.5,
    image:
      "https://santanatura.com.pe/wp-content/uploads/2021/10/harina_de_maca.jpg",
    category: "superfoods",
    stock: 50,
    rating: 4.8,
    benefits: ["Energía", "Rendimiento físico", "Fertilidad"],
  },
  {
    id: "2",
    name: "Aceite de Sacha Inchi",
    description: "Rico en Omegas 3, 6 y 9. Excelente para el corazón.",
    price: 32.0,
    image:
      "https://santanatura.com.pe/wp-content/uploads/2021/10/aceite-sacha-inti.jpg",
    category: "aceites",
    stock: 20,
    rating: 4.5,
    benefits: ["Cardiovascular", "Cerebro"],
  },
  {
    id: "3",
    name: "Miel de Abeja Pura",
    description:
      "Miel 100% natural, sin conservantes. Ideal para endulzar infusiones.",
    price: 25.0,
    image:
      "https://santanatura.com.pe/wp-content/uploads/2021/10/miel-de-abejas-3.jpg",
    category: "miel",
    stock: 100,
    rating: 4.9,
    benefits: ["Antioxidante", "Sistema inmunológico"],
  },
  {
    id: "4",
    name: "Cápsulas de Cúrcuma",
    description:
      "Potente antiinflamatorio natural con pimienta negra para mejor absorción.",
    price: 38.0,
    image:
      "https://santanatura.com.pe/wp-content/uploads/2024/02/Pack-Articulaciones.jpg",
    category: "capsulas",
    stock: 15,
    rating: 4.7,
    benefits: ["Antiinflamatorio", "Articulaciones"],
  },
];

const orders = [];

app.get("/api/products", (req, res) => {
  const { category } = req.query;
  if (category && category !== "todos") {
    return res.json(products.filter((p) => p.category === category));
  }
  res.json(products);
});

app.get("/api/products/search", (req, res) => {
  const { q } = req.query;
  if (!q) return res.json(products);
  const results = products.filter((p) =>
    p.name.toLowerCase().includes(q.toLowerCase()),
  );
  res.json(results);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (product) return res.json(product);
  res.status(404).json({ message: "Product not found" });
});

app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.post("/api/orders", (req, res) => {
  const order = {
    id: `ORD-${Date.now()}`,
    ...req.body,
    status: "pendiente",
    date: new Date().toISOString(),
  };
  orders.push(order);
  res.status(201).json(order);
});

app.post("/api/auth/login", (req, res) => {
  res.json({
    token: "mock-jwt-token-123",
    user: { name: "Usuario Demo", email: req.body.email },
  });
});

app.get("/api/categories", (req, res) => {
  res.json([
    "todos",
    "superfoods",
    "aceites",
    "capsulas",
    "infusiones",
    "miel",
  ]);
});

const PORT = 9090;
app.listen(PORT, () => {
  console.log(`Backend de NatureApp corriendo en puerto ${PORT}`);
});
