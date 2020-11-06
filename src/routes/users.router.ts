import { Router } from 'express'
import CreateUserService from '../services/CreateUserService'
import { getRepository } from 'typeorm'
import User from '../models/Users'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const userRouter = Router()

userRouter.get('/', async (request, response) => {
    const usersRepository = getRepository(User)
    const users = await usersRepository.find()
    return response.json(users)
})

userRouter.post('/', async (request, response) => {
    try{

        const { name, email, password } = request.body

        const UserService = new CreateUserService()

        const user = await UserService.execute({ name, email, password })

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at
        }

        return response.json(userWithoutPassword)

    }catch (err) {

        response.status(400).json({ error: err.message })
    }
})

userRouter.patch('/avatar', ensureAuthenticated, async (request, response) => {
    response.json({ ok: true })
})
export default userRouter
