import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import workflowRoutes from "./routes/workflow.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://trigger-flow-client.vercel.app"
  ],
  credentials: true
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());
app.use(cookieParser());

async function startServer() {
  try {
    console.log("Connecting Mongo...");

    await mongoose.connect(process.env.MONGO_URI!);

    console.log("✅ Mongo connected");

    app.use("/api/auth", authRoutes);
    app.use("/api/workflow", workflowRoutes);

    app.get("/", (req, res) => {
      res.send("TriggerFlow API running");
    });

    const PORT = Number(process.env.PORT) || 3000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Mongo connection failed:", err);
    process.exit(1);
  }
}

startServer();