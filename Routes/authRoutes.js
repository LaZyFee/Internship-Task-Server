import express from "express";
import { registerUser, loginUser, checkAdmin, logoutUser } from "../Controller/AuthController.js";
import { verifyToken } from "../Middlewares/verifyToken.js";

const router = express.Router();

// Register route for uploading profile pictures
router.post("/signup", registerUser);

// Login route
router.post("/login", loginUser);

// Check if user is admin
router.get("/check-admin", verifyToken, checkAdmin)

//logout route
router.post("/logout", logoutUser);

export default router;
