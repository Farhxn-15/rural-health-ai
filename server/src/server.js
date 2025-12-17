import express from "express";
import { testConnection } from "./configs/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
// import { authRoute, predictRoute, userRoute } from "./routes/index.js";
import { authRoute, bloodBankRoute, userRoute } from "./routes/index.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || "8000";

//Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/blood", bloodBankRoute);
app.use("/api/user", userRoute);
// app.use("/api/predict", predictRoute);
app.get("/", (req, res) => {
  res.send("Valar Morghulis!");
});

const start = async () => {
  try {
    await testConnection(); // wait for DB connection
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Server failed to start:", err);
    process.exit(1);
  }
};

start();
