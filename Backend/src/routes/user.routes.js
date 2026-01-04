import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";

const router = Router();

// Route: http://localhost:8000/api/v1/users/register
router.route("/register").post(registerUser);

// Route: http://localhost:8000/api/v1/users/login
router.route("/login").post(loginUser);

export default router;