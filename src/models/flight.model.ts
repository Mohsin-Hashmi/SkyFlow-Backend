import mongoose, { Schema, Model } from "mongoose";
import { IFlight } from "../types/flight";
const flightSchema = new mongoose.Schema<IFlight>({
    flightNumber: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },
    airline: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Airline',
        required: true
    },
    origin: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min: [0, 'Duration must be a positive number']
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be a positive number']
    },
    seats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seat',
    }],
    totalSeats: {
        type: Number,
        required: true,
        min: [0, 'Total seats must be a positive number']
    },
    availableSeats: {
        type: Number,
        required: true,
        min: [0, 'Available seats must be a positive number']
    },
    status: {
        type: String,
        enum: ['scheduled', 'delayed', 'cancelled', 'completed'],
        default: 'scheduled'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

export const Flight = mongoose.model<IFlight>('Flight', flightSchema);