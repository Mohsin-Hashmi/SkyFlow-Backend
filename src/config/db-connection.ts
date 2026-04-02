
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    const uri = process.env.MONGO_URI as string;
    if (!uri) {
        throw new Error("MONGO_URI is not set in environment");
    }

    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error(
            `Failed to connect to the database: ${
                error instanceof Error ? error.message : String(error)
            }`
        );
    }
};