import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/Users';
import AuthConfig from '@config/AuthConfig';
import AppError from '@shared/errors/AppError';

import IUserRepository from '@modules/users/repositories/IUserRepository';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email);

        if (!user)
            throw new AppError('Incorrect E-mail/Password combination.', 401);

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched)
            throw new AppError('Incorrect E-mail/Password combination.', 401);

        const { expiresIn, secret } = AuthConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return { user, token };
    }
}

export default AuthenticateUserService;
