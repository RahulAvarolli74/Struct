import { Router } from "express";
import { bookService } from "../controllers/booking.controller.js";

const router = Router();

router.route("/bookService").post(bookService);

export default router;