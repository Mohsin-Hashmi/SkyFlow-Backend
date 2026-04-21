import { z } from 'zod';
export const baseUserSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(['admin', 'airlineOwner', 'customer']).default('airlineOwner')
});

export const createUserSchema = z.object({
    body: baseUserSchema
});
export const loginUserSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters long")
    })
});
export const updateUserSchema = z.object({
    params: z.object({
        id: z.string()
    }),
    body: baseUserSchema.partial()
});