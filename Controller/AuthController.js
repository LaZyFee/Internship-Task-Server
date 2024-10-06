import { UserModel } from "../Models/AuthModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../Utils/generateToken.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user with hashed password
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });

        // Generate JWT token
        const token = generateToken(user._id);

        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = generateToken(user._id);

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            token,
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const checkAdmin = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ isAdmin: user.isAdmin });
    } catch (error) {
        console.error("Error checking admin status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}