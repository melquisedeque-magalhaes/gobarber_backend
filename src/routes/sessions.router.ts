import { Router } from 'express'
import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionRouter = Router()

sessionRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body

        const AuthenticateUser = new AuthenticateUserService()

        const { user, token } = await AuthenticateUser.execute({ email, password })

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at
        }

        return response.json({ user: userWithoutPassword, token })
    }catch (err){
        return response.status(400).json({ error: err.message })
    }
})

export default sessionRouter;
