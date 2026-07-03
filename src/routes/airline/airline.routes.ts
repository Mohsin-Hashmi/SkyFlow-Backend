import express from 'express';
import { createAirline, getAirlines, getAirlineById, deleteAirlineById, updateAirlineById } from '../../services/airline/airline.service';
import { authenticate } from '../../middleware/auth.middleware';
import { createAirlineSchema, updateAirlineSchema } from '../../schema/airline.validation';
import { validate } from '../../middleware/validate.middleware';
import { checkPermission } from '../../middleware/check-permission.middleware';
export const airLineRouter = express.Router();

airLineRouter.post('/create-airline', validate(createAirlineSchema), authenticate, checkPermission('airlines', 'create'), createAirline);
airLineRouter.get('/get-airlines', authenticate, checkPermission('airlines', 'read'), getAirlines);
airLineRouter.get('/get-airline/:id', authenticate, checkPermission('airlines', 'read'), getAirlineById);
airLineRouter.delete('/delete-airline/:id', authenticate, checkPermission('airlines', 'delete'), deleteAirlineById);
airLineRouter.put('/update-airline/:id', authenticate, validate(updateAirlineSchema), checkPermission('airlines', 'update'), updateAirlineById);

