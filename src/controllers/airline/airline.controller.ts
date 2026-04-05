import { Request, Response } from "express";
import { Airline } from "../../models/airline.model";
import { User } from "../../models/user";
export const createAirline = async (req: Request, res: Response) => {
    try {
        const { name, code, logo, country, contactEmail, contactPhone, address, isActive } = req.body;
        const createdBy = req.user?._id;
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;

        if(!createdBy) {
            return res.status(400).json({
                success: false,
                message: "User ID is required to create an airline"
            });
        }
        const isUserExist = await User.findById(createdBy).lean();
        if(!isUserExist) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        if (!name || !code || !country || !contactEmail) {
            return res.status(400).json({
                success: false,
                message: "Name, code, country and contact email are required"
            })
        }

        if (contactPhone && !phoneRegex.test(contactPhone)) {
            return res.status(400).json({
                success: false,
                message: "Invalid contact phone number format"
            })
        }

        if (address && !addressRegex.test(address)) {
            return res.status(400).json({
                success: false,
                message: "Invalid address format"
            })
        }

        if (address.length < 10 || address.length > 100) {
            return res.status(400).json({
                success: false,
                message: "Address must be between 10 and 100 characters"
            })
        }

        const newAirline = await Airline.create({
            name, code, logo, country, contactEmail, contactPhone, address, isActive, createdBy
        })

        return res.status(201).json({
            success: true,
            message: "Airline created successfully",
            airline: newAirline
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

export const getAirlines = async (req: Request, res: Response) => {
    try {
        const airLinesOwner = req.user?._id;
        if (!airLinesOwner) {
            return res.status(400).json({
                success: false,
                message: "User ID is required to fetch airlines"
            })

        }

        const isOwnerExist = await User.findById(airLinesOwner).lean();
        if (!isOwnerExist) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const getAllAirlinesOfOwner = await Airline.find({
            createdBy: airLinesOwner
        })
        return res.status(200).json({
            success: true,
            message: "Airlines retrieved successfully",
            airlines: getAllAirlinesOfOwner
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

export const getAirlineById = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}