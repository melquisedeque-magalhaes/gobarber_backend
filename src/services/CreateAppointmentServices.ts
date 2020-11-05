import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import { getCustomRepository } from 'typeorm'
import AppontmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentServices {


    public async execute({ provider, date }: Request): Promise<Appointment> {

        const appointmentsRepository = getCustomRepository(AppontmentsRepository)

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            {
                date: appointmentDate,
            },
        );

        if (findAppointmentInSameDate)
            throw Error('This appointment is already booked');

        const appointment = appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment)

        return appointment;
    }
}

export default CreateAppointmentServices;
