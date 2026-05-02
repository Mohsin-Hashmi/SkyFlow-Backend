import {z} from 'zod';

export const baseAirlineSchema = z.object({
    name: z.string().min(1, 'Airline name is required'),
    code: z.string().min(1, 'Airline code is required').regex(/^[A-Z]{2}$/, 'Airline code must be 2 uppercase letters'),
    logo: z.string().optional(),
    country: z.string().min(1, 'Country Name is required'),
    contactEmail: z.string().min(1, 'Contact email is required').email('Invalid email format'),
    contactPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format').optional(),
    address: z.string().min(10, 'Address must be at least 10 characters').max(100, 'Address must be at most 100 characters').optional(),
    isActive: z.boolean().optional(),
    createdBy: z.string().min(1, 'Created by user ID is required'),
})

export const createAirlineSchema = baseAirlineSchema;

export const updateAirlineSchema = baseAirlineSchema.partial().omit({ createdBy: true }).extend({
    code: z.string().regex(/^[A-Z]{2}$/, 'Airline code must be 2 uppercase letters').optional(),
});