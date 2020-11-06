import User from "../models/Users";
import { getRepository } from 'typeorm'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'

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

        const token = sign({ }, '8c54e40b68656e97ea12b5bd6f176ede', {
            subject: user.id,
            expiresIn: '1d'
        })

        return { user, token }
    }
}

export default AuthenticateUserService
