const jsonServer = require("json-server");
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

app.use(cors());
app.use(middlewares);

// Serve frontend build from /dist
app.use(express.static(path.join(__dirname, "dist")));

// Mount JSON Server under /api
app.use("/api", router);

// Fallback for React Router (client-side routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Listen on dynamic port for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
