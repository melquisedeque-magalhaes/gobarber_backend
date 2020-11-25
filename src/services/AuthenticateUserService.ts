import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import User from '../models/Users';
import AuthConfig from '../config/AuthConfig';
import AppError from '../errors/AppError';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: { email },
        });

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
