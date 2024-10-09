import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from 'stripe';

import { connectDB } from "./DB/connectDB.js";
import authRoutes from "./Routes/authRoutes.js";
import planRoutes from "./Routes/planRoutes.js";
import paymentRoutes from "./Routes/paymentRoutes.js";


dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5174",
    credentials: true
}));
// app.use(cors({
//     origin: true,
//     credentials: true
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
