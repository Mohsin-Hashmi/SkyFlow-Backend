import mongoose, { Schema, Document, Model } from "mongoose";
import { IAirline } from "../types/airline";


const airlineSchema: Schema<IAirline> = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },

        logo: {
            type: String,
            default: "",
        },

        country: {
            type: String,
            required: true,
        },

        contactEmail: {
            type: String,
            required: true,
            lowercase: true,
        },

        contactPhone: {
            type: String,
        },

        address: {
            type: String,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Airline: Model<IAirline> = mongoose.model<IAirline>("Airline", airlineSchema);