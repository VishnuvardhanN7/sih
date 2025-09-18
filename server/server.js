const express = require("express");
const cors = require("cors");
const cards = require("./data/cards.json");

const app = express();
app.use(cors());
app.use(express.json());

// API route
app.get("/api/cards", (req, res) => {
  res.json(cards);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
