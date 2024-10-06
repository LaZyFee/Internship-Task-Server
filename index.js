import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./DB/connectDB.js";
import authRoutes from "./Routes/authRoutes.js";

const app = express();
app.use(cors(
    {
        origin: "http://localhost:5174",
        credentials: true
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();
const PORT = process.env.PORT;


app.get("/", (req, res) => {
    res.send("Hello World! from Internship - Task backend");
});

app.use("/", authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at http://localhost:${PORT}`);
});
