import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import workflowRoutes from "./routes/workflow.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://trigger-flow-client.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

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