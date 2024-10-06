import mongoose from "mongoose";

export const connectDB = async () => {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9e7m0jr.mongodb.net/Internship-task?retryWrites=true&w=majority&appName=Cluster0`;

    // const uri = process.env.MONGO_CONNECTION_STRING;

    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};

