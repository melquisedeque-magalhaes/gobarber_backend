import { Router } from 'express';

import AppointmentRouterController from '@modules/appointments/infra/http/controllers/AppointmentsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

const appointmentRouterController = new AppointmentRouterController();

appointmentsRouter.post('/', appointmentRouterController.create);

export default appointmentsRouter;
