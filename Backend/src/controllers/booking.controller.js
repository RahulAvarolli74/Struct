import { Booking } from "../models/booking.model.js";

const bookService = async (req, res) => {
    try {
        // CHANGED: Added 'price' to the input destructuring
        const { customerName, packageName, vehicleType, price } = req.body;

        // Basic validation
        if ([customerName, packageName, vehicleType, price].some((field) => !field || field.trim() === "")) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create the booking record in MongoDB
        const createdBooking = await Booking.create({
            customerName,
            packageName,
            vehicleType,
            price // Saving the price
        });

        const checkBooking = await Booking.findById(createdBooking._id);

        if (!checkBooking) {
            return res.status(500).json({ message: "Something went wrong while booking the service" });
        }

        return res.status(201).json({
            message: "Service Booked Successfully",
            status: checkBooking.status,
            data: checkBooking
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export { bookService };