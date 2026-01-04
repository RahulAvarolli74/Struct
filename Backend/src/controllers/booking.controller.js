import { Booking } from "../models/booking.model.js";

const bookService = async (req, res) => {
    try {
        const { customerName, packageName, vehicleType } = req.body;

        // --- CRITICAL FIX: Improved Validation ---
        if ([customerName, packageName, vehicleType].some((field) => !field || field.trim() === "")) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const createdBooking = await Booking.create({
            customerName,
            packageName,
            vehicleType
        });

        const checkBooking = await Booking.findById(createdBooking._id);

        if (!checkBooking) {
            return res.status(500).json({ message: "Something went wrong while booking the service" });
        }

        return res.status(201).json({
            status: 200,
            data: checkBooking,
            message: "Service Booked Successfully"
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export { bookService };