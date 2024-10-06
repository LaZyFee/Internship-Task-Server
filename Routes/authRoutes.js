import express from "express";
import { registerUser, loginUser, checkAdmin } from "../Controller/AuthController.js";
import { verifyToken } from "../Middlewares/verifyToken.js";

const router = express.Router();

// Register route for uploading profile pictures
router.post("/signup", registerUser);

// Login route
router.post("/login", loginUser);

router.get("/check-admin", verifyToken, checkAdmin)

export default router;
