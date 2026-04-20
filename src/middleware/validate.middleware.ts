import { Request, Response, NextFunction } from 'express';
import { success, ZodSchema } from 'zod';

export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = schema.parse({
            body: req.body,
            params: req.params,
            query: req.query
        })
        // attach validated data (optional but powerful)
        req.body = result.body;
        req.params = result.params;
        req.query = result.query;

        next();
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: error.errors
        })
    }
}