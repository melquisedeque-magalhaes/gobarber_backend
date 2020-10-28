import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppontmentsRepository from '../repositories/AppointmentsRepository';

import CreateAppointmentService from '../services/CreateAppointmentServices';

const appointmentsRouter = Router();

const appointmentsRepository = new AppontmentsRepository();

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();
    return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
    try {
        const { provider, date } = request.body;

        const parseDate = parseISO(date);

        const createAppointmentServices = new CreateAppointmentService(
            appointmentsRepository,
        );

        const appointment = createAppointmentServices.execute({
            provider,
            date: parseDate,
        });

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
