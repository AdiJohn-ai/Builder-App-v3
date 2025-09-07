// index.js
import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env explicitly
dotenv.config({ path: path.join(__dirname, ".env") });

// Test if DeepSeek key is loaded
console.log("DEEPSEEK_API_KEY:", process.env.DEEPSEEK_API_KEY ? "Loaded " : "Missing ");

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chat.js";
import projectsRouter from "./routes/project.js"

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json());

// Routes
app.use("/api/projects", projectsRouter);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;

// DB + Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
   
  })
  .catch((err) => console.error("MongoDB Error:", err));

