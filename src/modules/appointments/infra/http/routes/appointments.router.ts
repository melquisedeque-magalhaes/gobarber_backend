import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppontmentsRepository from '@modules/appointments/infra/repositories/AppointmentsRepository';

import CreateAppointmentService from '@modules/appointments/infra/services/CreateAppointmentServices';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppontmentsRepository);
    const appointments = await appointmentsRepository.find();
    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointmentServices = new CreateAppointmentService();

    const appointment = await createAppointmentServices.execute({
        provider_id,
        date: parseDate,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
