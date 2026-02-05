import { createServer } from "../server/index";
import serverlessHttp from "serverless-http";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the Express app
const app = await createServer();

// In production, serve the built SPA files
const distPath = path.join(__dirname, "../dist/spa");

// Serve static files from the SPA build
app.use(express.static(distPath));

// Handle React Router - serve index.html for all non-API routes
app.get("*", (req, res) => {
  // Don't serve index.html for API routes or uploads
  if (req.path.startsWith("/api/") || req.path.startsWith("/uploads/")) {
    return res.status(404).json({ error: "Not found" });
  }

  res.sendFile(path.join(distPath, "index.html"));
});

// Export as serverless function
export default serverlessHttp(app);

