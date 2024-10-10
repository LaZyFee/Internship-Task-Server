import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./DB/connectDB.js";
import authRoutes from "./Routes/authRoutes.js";
import planRoutes from "./Routes/planRoutes.js";
import paymentRoutes from "./Routes/paymentRoutes.js";

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
    origin: "https://internship-task-hr.netlify.app", // Allow your frontend
    credentials: true
}));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the port
const PORT = process.env.PORT || 5001;

// Root route
app.get("/", (req, res) => {
    res.send("Hello World! from Internship - Task backend");
});

// API routes with '/api' prefix
app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/payments", paymentRoutes);

// Start server and connect to the database
app.listen(PORT, () => {
    connectDB(); // Connect to MongoDB
    console.log(`Server running at http://localhost:${PORT}`);
});
