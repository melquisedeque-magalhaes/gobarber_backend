import FakeAppointmentRepository from '@modules/appointments/repositories/Fakes/FakeAppointmentsRepository';

import CreateAppointmentService from '@modules/appointments/infra/services/CreateAppointmentServices';

import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
    it('Should be able to create a new appointment', async () => {
        const fakeAppointmentRepository = new FakeAppointmentRepository();

        const createAppointment = new CreateAppointmentService(
            fakeAppointmentRepository,
        );

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '123123',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123123');
    });

    it('Should not be able to create two appointments on the same date time ', async () => {
        const fakeAppointmentRepository = new FakeAppointmentRepository();

        const createAppointment = new CreateAppointmentService(
            fakeAppointmentRepository,
        );

        const appointmentDate = new Date();

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '123123',
        });

        expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
