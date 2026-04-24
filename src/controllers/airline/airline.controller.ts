import { Request, Response } from "express";
import { Airline } from "../../models/airline.model";
import { User } from "../../models/user";
export const createAirline = async (req: Request, res: Response) => {
    try {
        const { name, code, logo, country, contactEmail, contactPhone, address, isActive } = req.body;
        const createdBy = req.user?._id;
        const createdByRole = req.user?.role;
        if (createdByRole !== 'airlineOwner') {
            return res.status(403).json({
                success: false,
                message: "Only airline owners can create airlines"
            });
        }
        if (!createdBy) {
            return res.status(400).json({
                success: false,
                message: "User ID is required to create an airline"
            });
        }
        const isUserExist = await User.findById(createdBy).lean();
        if (!isUserExist) {
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
        const newAirline = await Airline.create({
            name, code, logo, country, contactEmail, contactPhone, address, isActive, createdBy
        })

        return res.status(201).json({
            success: true,
            message: "Airline created successfully",
            airline: newAirline,
            airlineOwner: isUserExist.firstName + " " + isUserExist.lastName
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
        const airLinesOwner = req.user?._id;
        const airlineId = req.params.id;
        if (!airLinesOwner) {
            return res.status(400).json({
                success: false,
                message: "User ID is required to fetch airline"
            })
        }

        const isOwnerExist = await User.findById(airLinesOwner).lean();
        if (!isOwnerExist) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        if (!airlineId) {
            return res.status(400).json({
                success: false,
                message: "Airline ID is required to fetch airline"
            })
        }
        const isAirlineExist = await Airline.findById(airlineId).lean();
        if (!isAirlineExist) {
            return res.status(404).json({
                success: false,
                message: "Airline not found"
            })
        }
        if (isAirlineExist.createdBy.toString() !== airLinesOwner.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to view this airline"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Airline retrieved successfully",
            airline: isAirlineExist,
            airlineOwner: isOwnerExist.firstName + " " + isOwnerExist.lastName
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}


export const deleteAirlineById = async (req: Request, res: Response) => {
    try {
        const airLinesOwner = req.user?._id;
        const airlineId = req.params.id;
        if (!airLinesOwner) {
            return res.status(400).json({
                success: false,
                message: "User ID is required to delete airline"
            })
        }
        const isValidOwner = await User.findById(airLinesOwner).lean();
        if (!isValidOwner) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        const isAirlineExist = await Airline.findById(airlineId);
        if (!isAirlineExist) {
            return res.status(404).json({
                success: false,
                message: "Airline not found"
            })
        }
        if (isAirlineExist.createdBy.toString() !== airLinesOwner.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this airline"
            })
        }
        const deletedAirline = await Airline.findByIdAndDelete(airlineId);
        return res.status(200).json({
            success: true,
            message: "Airline deleted successfully",
            deletedAirline: deletedAirline
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}


export const updateAirlineById = async (req: Request, res: Response) => {
    try {
        const airLinesOwner = req.user?._id;
        const airlineId = req.params.id;
        const { name, code, logo, country, contactEmail, contactPhone, address, isActive } = req.body;
        if (!airLinesOwner) {
            return res.status(400).json({
                success: false,
                message: "User ID is required to update airline"
            })
        }
        const isValidOwner = await User.findById(airLinesOwner).lean();
        if (!isValidOwner) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        const isAirlineExist = await Airline.findById(airlineId).lean();
        if (!isAirlineExist) {
            return res.status(404).json({
                success: false,
                message: "Airline not found"
            })
        }
        if (isAirlineExist.createdBy.toString() !== airLinesOwner.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this airline"
            })
        }
        const updatedAirline = await Airline.findByIdAndUpdate(airlineId, {
            name: name,
            code: code,
            logo: logo,
            country: country,
            contactEmail: contactEmail,
            contactPhone: contactPhone,
            address: address,
            isActive: isActive
        }, { new: true });
        return res.status(200).json({
            success: true,
            message: "Airline updated successfully",
            updatedAirline: updatedAirline
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}