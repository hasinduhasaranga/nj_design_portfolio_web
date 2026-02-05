import "dotenv/config";
import express from "express";
import cors from "cors";

export async function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Serve uploaded files
  app.use('/uploads', express.static('server/uploads'));

  // Register API routes
  const { registerRoutes } = await import("./routes");
  const httpServer = await registerRoutes(app);

  return app;
}
