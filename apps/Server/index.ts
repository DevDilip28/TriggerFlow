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
  origin: ["http://localhost:5173",
    "https://trigger-flow-client.vercel.app"
  ],
  credentials: true,
}));

async function startServer() {
  try {
    console.log("Connecting Mongo...");

    await mongoose.connect(process.env.MONGO_URI!);

    console.log("✅ Mongo connected");

    app.use("/api/auth", authRoutes);
    app.use("/api/workflow", workflowRoutes);

    app.get("/", (req, res) => {
      res.send("Welcome to TriggerFlow Server!");
    });

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Mongo connection failed:", err);
    process.exit(1);
  }
}

startServer();