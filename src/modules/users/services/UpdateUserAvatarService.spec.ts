import FakeUserRepository from '@modules/users/repositories/fakes/FakesUserRepository';

import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';

describe('UpdateUserAvatar', () => {
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
});
