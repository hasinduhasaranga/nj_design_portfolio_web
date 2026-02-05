
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure storage
const uploadDir = path.join(process.cwd(), "server/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const diskStorage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadDir);
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: diskStorage });

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/content", async (_req, res) => {
    try {
      const content = await storage.getContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch content" });
    }
  });

  app.post("/api/content", async (req, res) => {
    try {
      const content = req.body;
      await storage.updateContent(content);
      res.json({ message: "Content updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update content" });
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
      const { password } = req.body;
      const storedPassword = await storage.getPassword();
      
      if (password !== storedPassword) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      res.json({ message: "Login successful" });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/password", async (req, res) => {
    try {
      const { current, new: newPassword } = req.body;
      const storedPassword = await storage.getPassword();
      
      if (current !== storedPassword) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }

      await storage.updatePassword(newPassword);
      res.json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update password" });
    }
  });

  app.post("/api/upload", upload.single('file'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const fileUrl = `/uploads/${req.file.filename}`;
      const isVideo = req.file.mimetype.startsWith('video/');
      const type = isVideo ? 'video' : 'image';

      res.json({ url: fileUrl, type });
    } catch (error) {
      res.status(500).json({ message: "File upload failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
