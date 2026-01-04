import express from "express";
import cors from "cors";

const app = express();

// 1. Allow access from anywhere (for easy testing)
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// 2. Accept JSON data (e.g. from Postman or Frontend)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Static folder (Optional, if you serve images)
app.use(express.static("public"));
import userRouter from './routes/user.routes.js';

// --- ROUTES DECLARATION ---
// This creates the prefix: /api/v1/users
app.use("/api/v1/users", userRouter);

export { app };