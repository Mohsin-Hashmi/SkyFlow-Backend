


import { Action, Resource } from '../types/permissions';
const PERMISSIONS: Record<string, string[]> = {

    admin: [
        'flights:*',
        'airlines:*',
        'bookings:*',
        'users:*',
        'seats:*'
    ],
    airlineOwner: [
        'flights:create',
        'flights:read',
        'flights:update',
        'flights:delete',
        'airlines:read',
        'airlines:update',
        'bookings:read',
        'users:read',
        'seats:read',
        'seats:update',
        'seats:delete',
        'seats:create'
    ],
    customer: [
        'flights:read',
        'airlines:read',
        'bookings:create',
        'bookings:read',
        'bookings:update',
        'bookings:delete',
        'seats:read'
    ]
}

export function hasPermission(role: string, action: Action, resource: Resource): boolean {
    const permissions = PERMISSIONS[role] ?? [];  
    if (!permissions) {
        return false;
    }
    const permission = `${resource}:${action}`;
    return permissions.includes(permission) || permissions.includes(`${resource}:*`);
}

export {PERMISSIONS};