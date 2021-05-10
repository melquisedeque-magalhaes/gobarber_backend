import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

// import User from '@modules/users/infra/typeorm/entities/Users';

import IUserRepository from '@modules/users/repositories/IUserRepository';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute(): Promise<void> {}
}

export default SendForgotPasswordEmailService;
