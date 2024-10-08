import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./DB/connectDB.js";
import bodyParser from "body-parser";
import authRoutes from "./Routes/authRoutes.js";
import planRoutes from "./Routes/planRoutes.js";
import paymentRoutes from "./Routes/paymentRoutes.js";

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5174",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
    res.send("Hello World! from Internship - Task backend");
});

app.use("/", authRoutes);
app.use("/", planRoutes);
app.use("/", paymentRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at http://localhost:${PORT}`);
});
