import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    packageName: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    // ADDED: Price field included
    price: {
        type: String, 
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["Confirmed", "Pending", "Cancelled"],
        default: "Confirmed"
    }
}, { timestamps: true });

export const Booking = mongoose.model("Booking", bookingSchema);