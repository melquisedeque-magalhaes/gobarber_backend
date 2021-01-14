import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/Users';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UserController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const usersRepository = getRepository(User);
        const users = await usersRepository.find();
        return response.json(users);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;

        const UserService = container.resolve(CreateUserService);

        const user = await UserService.execute({
            name,
            email,
            password,
        });

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        return response.json(userWithoutPassword);
    }
}
