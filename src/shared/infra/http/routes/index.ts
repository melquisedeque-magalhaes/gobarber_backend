import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.router';
import userRouter from '@modules/users/infra/http/routes/users.router';
import sessionRouter from '@modules/users/infra/http/routes/sessions.router';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/sessions', sessionRouter);

export default routes;
