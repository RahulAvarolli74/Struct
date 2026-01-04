import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Allow your frontend
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
import userRouter from './routes/user.routes.js';
import bookingRouter from './routes/booking.routes.js';

app.use("/api/v1/users", userRouter);
app.use("/api/v1/bookings", bookingRouter);

export { app };