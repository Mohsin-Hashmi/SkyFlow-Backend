import express from 'express';
export const flightRouter = express.Router();
import { createFlight } from '../../controllers/flight/flight.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { checkPermission } from '../../middleware/check-permission.middleware';

flightRouter.post('/create-flight/:airlineId', authenticate, checkPermission('flights', 'create'), createFlight);