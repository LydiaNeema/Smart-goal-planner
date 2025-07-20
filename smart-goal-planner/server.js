// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import jsonServer from "json-server";

// Setup for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

app.use(cors());
app.use(middlewares);

// Serve frontend build from /dist
app.use(express.static(path.join(__dirname, "dist")));

// Mount JSON Server under /api
app.use("/api", router);

// Fallback for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
