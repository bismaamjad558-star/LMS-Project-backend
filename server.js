import cors from "cors";
import courseRoutes from "./routes/courseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/enrollment", enrollmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


mongoose
  
.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("LMS Backend is Running...");
})
export default app;