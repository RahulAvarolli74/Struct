import express from "express";
import cors from "cors";
import { ApiError } from "./utils/ApiError.js"; // Import ApiError to check instance

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173"||"http://localhost:5174", 
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

app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
            data: err.data
        });
    }

    return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

export { app };