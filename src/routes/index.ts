import { Router } from 'express';
import appointmentsRouter from './appointments.router';
import userRouter from './users.router'
import sessionRouter from './sessions.router';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', userRouter)
routes.use('/sessions', sessionRouter)

export default routes;
