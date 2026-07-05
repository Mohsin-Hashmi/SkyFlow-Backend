
import { Request, Response } from "express";
import { User } from "../../models/user";
import { Seat } from "../../models/seat.model";
import { Airline } from "../../models/airline.model";
import { Flight } from "../../models/flight.model";
import { success } from "zod";
export const createFlight = async (req: Request, res: Response) => {
    try {
        const { flightNumber, origin, destination, departure, arrival, departureTime, arrivalTime, duration, price, totalSeats, availableSeats } = req.body;
        if (!flightNumber || !origin || !destination || !departure || !arrival || !departureTime || !arrivalTime || !duration || !price || !totalSeats || !availableSeats) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const airlineId = req.params.airlineId;
        const userId = req.user?._id;
        if (!userId) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized: No user found'
            })
        }

        const isUserExist = await User.findById(userId).lean();
        if (!isUserExist) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        if (!airlineId) {
            return res.status(400).json({
                success: false,
                message: 'Airline ID is required to create a flight'
            })
        }

        const isAirlineExist = await Airline.findById(airlineId).lean();
        if (!isAirlineExist) {
            return res.status(404).json({
                success: false,
                message: 'Airline not found'
            });
        }

        const newFlight = await Flight.create({
            flightNumber: flightNumber,
            airline: isAirlineExist._id,
            origin: origin,
            destination: destination,
            departure: departure,
            arrival: arrival,
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            price: price,
            totalSeats: totalSeats,
            availableSeats: availableSeats,
            duration: duration,
            createdBy: isUserExist._id
        })

        return res.status(201).json({
            success: true,
            message: 'Flight created successfully',
            flight: newFlight
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}


export const getAllFlights = async (req: Request, res: Response) => {
    try {

        const userId = req.user?._id;
        if (!userId) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized: No user found'
            })
        }

        const isUserExist = await User.findById(userId).lean();
        if (!isUserExist) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const flights = await Flight.find().populate('airline').lean();
        return res.status(200).json({
            success: true,
            message: 'Flights fetched successfully',
            flights: flights
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}

export const getFlightById = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        const flightId = req.params.flightId;
        if (!userId) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized: No user found'
            })
        }
        const isUserExist = await User.findById(userId).lean();
        if (!isUserExist) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        if (!flightId) {
            return res.status(400).json({
                success: false,
                message: 'Flight ID is required to fetch flight details'
            })
        }

        const isFlightExist = await Flight.findById(flightId).populate('airline');
        if (!isFlightExist) {
            return res.status(404).json({
                success: false,
                message: 'Flight not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Flight fetched successfully',
            flight: isFlightExist
        })



    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}

export const deleteFlightById = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        const flightId = req.params.flightId;
        if (!userId) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized: No user found'
            })
        }
        if (!flightId) {
            return res.status(400).json({
                success: false,
                message: 'Flight ID is required to delete flight'
            })
        }
        const isUserExist = await User.findById(userId).lean();
        if (!isUserExist) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        const isFlightExist = await Flight.findById(flightId).lean();
        if (!isFlightExist) {
            return res.status(404).json({
                success: false,
                message: 'Flight not found'
            })
        }
        const deletedFlight = await Flight.findByIdAndDelete(flightId);
        return res.status(200).json({
            success: true,
            message: 'Flight deleted successfully',
            flight: deletedFlight
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}

export const updateFlightById = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        const flightId = req.params.flightId;
        const { flightNumber, origin, destination, departure, arrival, departureTime, arrivalTime, duration, price, totalSeats, availableSeats } = req.body;
        if (!userId) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized: No user found'
            })
        }
        if (!flightId) {
            return res.status(400).json({
                success: false,
                message: 'Flight ID is required to update flight'
            })
        }
        // to be continued with the update logic for the flight
        const isUserExist = await User.findById(userId).lean();
        if (!isUserExist) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        const isFlightExist = await Flight.findById(flightId).lean();
        if (!isFlightExist) {
            return res.status(404).json({
                success: false,
                message: 'Flight not found'
            })
        }
        const updatedFlight = await Flight.findByIdAndUpdate(flightId, {
            flightNumber: flightNumber || isFlightExist.flightNumber,
            origin: origin || isFlightExist.origin,
            destination: destination || isFlightExist.destination,
            departure: departure || isFlightExist.departure,
            arrival: arrival || isFlightExist.arrival,
            departureTime: departureTime || isFlightExist.departureTime,
            arrivalTime: arrivalTime || isFlightExist.arrivalTime,
            duration: duration || isFlightExist.duration,
            price: price || isFlightExist.price,
            totalSeats: totalSeats || isFlightExist.totalSeats,
            availableSeats: availableSeats || isFlightExist.availableSeats
        }, { new: true });
        return res.status(200).json({
            success: true,
            message: 'Flight updated successfully',
            flight: updatedFlight
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}