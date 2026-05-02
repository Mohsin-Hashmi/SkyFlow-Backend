import express from 'express';
import { createAirline, getAirlines, getAirlineById, deleteAirlineById, updateAirlineById } from '../../services/airline/airline.service';
import { authenticate } from '../../middleware/auth.middleware';
import { createAirlineSchema, updateAirlineSchema } from '../../schema/airline.validation';
import { validate } from '../../middleware/validate.middleware';
export const airLineRouter = express.Router();

airLineRouter.post('/create-airline', authenticate, validate(createAirlineSchema), createAirline);
airLineRouter.get('/get-airlines', authenticate, getAirlines);
airLineRouter.get('/get-airline/:id', authenticate, getAirlineById);
airLineRouter.delete('/delete-airline/:id', authenticate, deleteAirlineById);
airLineRouter.put('/update-airline/:id', authenticate, validate(updateAirlineSchema), updateAirlineById);

