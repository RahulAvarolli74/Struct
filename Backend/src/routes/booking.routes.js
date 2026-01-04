import { Router } from "express";
import { bookService } from "../controllers/booking.controller.js";

const router = Router();

// Route: http://localhost:8000/api/v1/bookings/book
router.route("/book").post(bookService);

export default router;