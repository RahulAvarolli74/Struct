import express from "express";
import cors from "cors";

const app = express();

// 1. Allow access from anywhere (for easy testing)
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Use env var or default to your frontend
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Static folder
app.use(express.static("public"));

// Import Routes
import userRouter from './routes/user.routes.js';
import bookingRouter from './routes/booking.routes.js'; // Import the new route

app.use("/api/v1/users", userRouter);

app.use("/api/v1/bookings", bookingRouter);

export { app };