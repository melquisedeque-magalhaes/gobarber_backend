import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/infra/services/CreateAppointmentServices';

export default class AppointmentsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id, date } = request.body;

        const parseDate = parseISO(date);

        const createAppointmentServices = container.resolve(
            CreateAppointmentService,
        );

        const appointment = await createAppointmentServices.execute({
            provider_id,
            date: parseDate,
        });

        return response.json(appointment);
    }
}
