import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/Users';
import UploadConfig from '@config/upload';

interface Request {
    user_id: string;
    avatarFileName: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFileName }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(user_id);

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

        await userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
