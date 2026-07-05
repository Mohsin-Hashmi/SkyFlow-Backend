import express from 'express';
export const flightRouter = express.Router();
import { createFlight, getAllFlights, getFlightById, deleteFlightById, updateFlightById } from '../../controllers/flight/flight.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { checkPermission } from '../../middleware/check-permission.middleware';

flightRouter.post('/create-flight/:airlineId', authenticate, checkPermission('flights', 'create'), createFlight);
flightRouter.get('/get-all-flights', authenticate, checkPermission('flights', 'read'), getAllFlights);
flightRouter.get('/get-flight/:flightId', authenticate, checkPermission('flights', 'read'), getFlightById);
flightRouter.delete('/delete-flight/:flightId', authenticate, checkPermission('flights', 'delete'), deleteFlightById);
flightRouter.put('/update-flight/:flightId', authenticate, checkPermission('flights', 'update'), updateFlightById);