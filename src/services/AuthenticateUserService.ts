import User from "../models/Users";
import { getRepository } from 'typeorm'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'
import AuthConfig from '../config/AuthConfig'
interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response>{
        const userRepository = getRepository(User)

        const user = await userRepository.findOne({
            where: { email }
        })

        if(!user)
            throw Error("Incorrect E-mail/Password combination.");

        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched)
            throw Error("Incorrect E-mail/Password combination.");

        const { expiresIn, secret } = AuthConfig.jwt

        const token = sign({ }, secret, {
            subject: user.id,
            expiresIn
        })

        return { user, token }
    }
}

export default AuthenticateUserService
