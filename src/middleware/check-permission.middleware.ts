
import { hasPermission } from "../config/permissions"
import { Request, Response, NextFunction } from "express";
import { Action, Resource } from "../types/permissions";
export const checkPermission = (resource: Resource, action: Action) => {

    return (req: Request, res: Response, next: NextFunction) => {
        const role = req.user?.role;
        if(!role) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized: No role found'
            });
        }
        if(!hasPermission(role, action, resource)) {
            return res.status(403).json({
                success: false,
                message: `Forbidden: requires ${resource}:${action} permission`
            });
        }
        next();
    }
}