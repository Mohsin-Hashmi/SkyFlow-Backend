
import { Request, Response } from "express";
import { User } from "../../models/user";
import { Seat } from "../../models/seat.model";
import { Airline } from "../../models/airline.model";
import { success } from "zod";
export const createFlight = async (req: Request, res: Response) => {
    try {
        const { flightNumber, origin,destination, departure, arrival, departureTime, arrivalTime, price, totalSeats, availableSeats } = req.body;
        if (!flightNumber || !origin || !destination || !departure || !arrival || !departureTime || !arrivalTime || !price || !totalSeats || !availableSeats) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const airlineId= req.params.airlineId;
        if(!airlineId){
            return res.status(400).json({
                success: false,
                message: 'Airline ID is required to create a flight'
            })
        }

        const isAirlineExist = await Airline.findById(airlineId).lean();
        if(!isAirlineExist){
            return res.status(404).json({
                success: false,
                message: 'Airline not found'
            });
        }


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}