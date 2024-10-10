import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./DB/connectDB.js";
import authRoutes from "./Routes/authRoutes.js";
import planRoutes from "./Routes/planRoutes.js";
import paymentRoutes from "./Routes/paymentRoutes.js";


dotenv.config();

const app = express();

app.use(cors({
    origin: "https://internship-task-hr.netlify.app",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
    res.send("Hello World! from Internship - Task backend");
});

app.use("/api/", authRoutes);
app.use("/api/", planRoutes);
app.use("/api/", paymentRoutes);

// Start server and connect to the database
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at http://localhost:${PORT}`);
});