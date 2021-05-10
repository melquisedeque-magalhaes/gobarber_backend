import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/Users';
import ICreatedUsersDTO from '@modules/users/dtos/ICreatedUsersDTO';
import { uuid } from 'uuidv4';

class UserRepository implements IUserRepository {
    private users: User[] = [];

    public async findById(id: string): Promise<User | undefined> {
        const findUserId = this.users.find(user => user.id === id);

        return findUserId;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUserEmail = this.users.find(user => user.email === email);

        return findUserEmail;
    }

    public async create(dataUser: ICreatedUsersDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: uuid() }, dataUser);

        this.users.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(
            findUser => findUser.id === user.id,
        );

        this.users[findIndex] = user;

        return user;
    }
}

export default UserRepository;
