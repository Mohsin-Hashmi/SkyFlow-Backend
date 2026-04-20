import mongoose from "mongoose";
import { ISeat } from "../types/seat";

const seatSchema = new mongoose.Schema<ISeat>({
    seatNumber: {
        type: String,
        required: true
    },
    class: {
        type: String,
        enum: ['economy', 'business', 'first'],
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    }
})

export const Seat = mongoose.model<ISeat>('Seat', seatSchema);