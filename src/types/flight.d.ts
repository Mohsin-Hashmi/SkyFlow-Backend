import mongoose, { Document } from 'mongoose';
import { ISeat } from './seat';

export interface IFlight extends Document {
    flightNumber: string;
    airline: mongoose.Types.ObjectId;
    origin: string;
    destination: string;
    departureTime: Date;
    arrivalTime: Date;
    duration: number; // in minutes
    price: number;
    seats: ISeat[];
    totalSeats: number;
    availableSeats: number;
    status: "scheduled" | "delayed" | "cancelled" | "completed";
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}