import FakeUserRepository from '@modules/users/repositories/fakes/FakesUserRepository';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from '@modules/users/services/CreateUserService';

import AppError from '@shared/errors/AppError';

describe('CreateAuthentication', () => {
    it('Should be able to create a new authentication', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const AuthenticateUser = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );

        const CreateUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );

        const user = await CreateUser.execute({
            name: 'Melqui',
            email: 'melqui.sodre15@gmail.com',
            password: '10203010',
        });

        const authenticate = await AuthenticateUser.execute({
            email: 'melqui.sodre15@gmail.com',
            password: '10203010',
        });

        expect(authenticate).toHaveProperty('token');
        expect(authenticate.user).toEqual(user);
    });

    it('Should not be able to authentication with non existent user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const AuthenticateUser = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );

        expect(
            AuthenticateUser.execute({
                email: 'melqui.sodre15@gmail.com',
                password: '10203010',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to authentication with a password incorrect', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const AuthenticateUser = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );

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
            AuthenticateUser.execute({
                email: 'melqui.sodre15@gmail.com',
                password: '102030100',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
