import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import { CORS_OPTIONS } from "./constants.js";
import apiRoutes from "../routes/api.js";
import { errorHandler } from "../middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp() {
  const app = express();

  // Middleware
  app.use(cors(CORS_OPTIONS));
  app.use(express.json());

  // Serve static frontend files in production
  if (process.env.NODE_ENV === "production") {
    const distPath = path.resolve(__dirname, "../../dist/client");
    app.use(express.static(distPath));
  }

  // API routes
  app.use("/api", apiRoutes);

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "success",
      message: "Server is running",
      timestamp: new Date().toISOString(),
    });
  });

  // Serve index.html for client-side routing in production
  if (process.env.NODE_ENV === "production") {
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../../dist/client/index.html"));
    });
  }

  // Error handler
  app.use(errorHandler);

  return app;
}
