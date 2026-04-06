import express from 'express';
import { createAirline, getAirlines, getAirlineById, deleteAirlineById } from '../../services/airline/airline.service';
import { authenticate } from '../../middleware/auth.middleware';
export const airLineRouter = express.Router();

airLineRouter.post('/create-airline', authenticate, createAirline);
airLineRouter.get('/get-airlines', authenticate, getAirlines);
airLineRouter.get('/get-airline/:id', authenticate, getAirlineById);
airLineRouter.delete('/delete-airline/:id', authenticate, deleteAirlineById);

