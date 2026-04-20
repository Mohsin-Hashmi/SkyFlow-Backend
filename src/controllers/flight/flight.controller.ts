
import { Request, Response } from "express";
import { User } from "../../models/user";
import { Seat } from "../../models/seat.model";
export const createFlight = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}