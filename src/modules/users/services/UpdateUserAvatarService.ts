import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/Users';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
    user_id: string;
    avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
        const user = await this.userRepository.findById(user_id);

        if (!user)
            throw new AppError(
                'Only authenticad users can change avatar ',
                401,
            );

        if (user.avatar) {
            await this.storageProvider.deleteFile(user.avatar);
        }

        const filename = await this.storageProvider.saveFile(avatarFileName);

        user.avatar = filename;

        await this.userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
