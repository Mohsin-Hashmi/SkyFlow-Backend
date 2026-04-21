import express from 'express';
export const flightRouter = express.Router();
import { createFlight } from '../../controllers/flight/flight.controller';
import { authenticate } from '../../middleware/auth.middleware';

flightRouter.post('/create-flight/:airlineId', authenticate, createFlight);