import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./DB/connectDB.js";
import authRoutes from "./Routes/authRoutes.js";
import planRoutes from "./Routes/planRoutes.js";
import paymentRoutes from "./Routes/paymentRoutes.js";
import mongoose from "mongoose";


dotenv.config();

const app = express();

// Correct CORS configuration
app.use(cors({
    origin: "https://internship-task-hr.netlify.app",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectMDB = async () => {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9e7m0jr.mongodb.net/Internship-task?retryWrites=true&w=majority&appName=Cluster0`;

    // const uri = process.env.MONGO_CONNECTION_STRING;

    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};


const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
    res.send("Hello World! from Internship - Task backend");
});

app.use("/", authRoutes);
app.use("/", planRoutes);
app.use("/", paymentRoutes);

// Start server and connect to the database
app.listen(PORT, () => {
    connectMDB();
    console.log(`Server running at http://localhost:${PORT}`);
});