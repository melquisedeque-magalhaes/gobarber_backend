import Appointments from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICreatedAppointmentsDTO from '@modules/appointments/dtos/ICreatedAppointmentsDTO';

export default interface IAppointmentRepository {
    create(data: ICreatedAppointmentsDTO): Promise<Appointments>;
    findByDate(date: Date): Promise<Appointments | undefined>;
}
