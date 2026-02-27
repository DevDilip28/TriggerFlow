import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import workflowRoutes from "./routes/workflow.route.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

await mongoose.connect(process.env.MONGO_URI!);

app.use("/api/auth", authRoutes);
app.use("/api/workflow", workflowRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to TriggerFlow Server!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("✅ Mongo connected");
  console.log("🚀 Server running on port", process.env.PORT || 3000);
});
