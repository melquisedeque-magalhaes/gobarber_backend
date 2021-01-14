import { Repository, getRepository } from 'typeorm';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/Users';
import ICreatedUsersDTO from '@modules/users/dtos/ICreatedUsersDTO';

class UserRepository implements IUserRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findById(id: string): Promise<User | undefined> {
        const userId = await this.ormRepository.findOne(id);

        return userId;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const userEmail = await this.ormRepository.findOne({
            where: { email },
        });

        return userEmail;
    }

    public async create(dataUser: ICreatedUsersDTO): Promise<User> {
        const user = this.ormRepository.create(dataUser);
        const userSave = await this.ormRepository.save(user);

        return userSave;
    }

    public async save(dataUser: User): Promise<User> {
        return this.ormRepository.save(dataUser);
    }
}

export default UserRepository;
