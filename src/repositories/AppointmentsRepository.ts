import Appointment from '../models/Appointment';
import { EntityRepository, Repository } from 'typeorm'

interface FindDate {
    date: Date;
}
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>{

    public async findByDate({ date }: FindDate): Promise<Appointment | null> {

        const findAppointment = await this.findOne({
            where: { date }
        })

        return findAppointment || null;
    }

}

export default AppointmentsRepository;
