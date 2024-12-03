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
    origin: ["http://localhost:5173", "https://internship-task-hr.netlify.app"],
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

app.use("/", authRoutes);
app.use("/", planRoutes);
app.use("/", paymentRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});
console.log("Server cold start at", new Date().toISOString());
app.use((req, res, next) => {
    console.time(`${req.method} ${req.url}`);
    res.on('finish', () => {
        console.timeEnd(`${req.method} ${req.url}`);
    });
    next();
});

export default app;
