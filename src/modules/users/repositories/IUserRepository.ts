import User from '@modules/users/infra/typeorm/entities/Users';
import ICreatedUsersDTO from '@modules/users/dtos/ICreatedUsersDTO';

export default interface IUserRepository {
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    create(data: ICreatedUsersDTO): Promise<User>;
    save(user: User): Promise<User>;
}
