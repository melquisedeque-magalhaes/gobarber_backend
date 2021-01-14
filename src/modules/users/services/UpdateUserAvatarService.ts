import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/Users';
import UploadConfig from '@config/upload';
import IUserRepository from '@modules/users/repositories/IUserRepository';

interface IRequest {
    user_id: string;
    avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
        const user = await this.userRepository.findById(user_id);

        if (!user)
            throw new AppError(
                'Only authenticad users can change avatar ',
                401,
            );

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                UploadConfig.directory,
                user.avatar,
            );

            const userAvatarFileExist = await fs.promises.stat(
                userAvatarFilePath,
            );

            if (userAvatarFileExist)
                await fs.promises.unlink(userAvatarFilePath);
        }

        user.avatar = avatarFileName;

        await this.userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
