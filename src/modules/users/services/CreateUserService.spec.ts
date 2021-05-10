import FakeUserRepository from '@modules/users/repositories/fakes/FakesUserRepository';

import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';

describe('CreateUsers', () => {
    it('Should be able to create a new user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const CreateUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );

        const user = await CreateUser.execute({
            name: 'Melqui',
            email: 'melqui.sodre15@gmail.com',
            password: '10203010',
        });

        expect(user).toHaveProperty('id');
    });

    it('Should not be able to create two users with same email', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const CreateUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );

        await CreateUser.execute({
            name: 'Melqui',
            email: 'melqui.sodre15@gmail.com',
            password: '10203010',
        });

        expect(
            CreateUser.execute({
                name: 'Melqui',
                email: 'melqui.sodre15@gmail.com',
                password: '10203010',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
