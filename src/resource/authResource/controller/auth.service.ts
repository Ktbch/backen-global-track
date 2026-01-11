import { AuthDto, createAccountDto } from "../../../lib/zod.schema";
import { UserRepository } from "../../userResource/repository/user.repository";
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { UnAuthorisedRequestError } from "../../../utils/app-error";
import { jwtHandler } from "../../../utils/Jwt-handle";
import { JwtPayload } from "jsonwebtoken";


// TODO CREATE USER AND LOGIN USER AND LOGOUT USE WITH COOKIES. AND MIDDLEWARE FOR VALIDATION,  ROLE AND AUTHGUARD

// could have user email but decided to useId
export class AuthService {
    userRepository: UserRepository

    constructor () {
        this.userRepository = new UserRepository()
    }

    async signUp (userInfo: createAccountDto) {

        const { email, password, fullName } = userInfo
        const userId = uuidv4()

        const hadPassword = await bcrypt.hash(password, 10)
        await this.userRepository.createUser({
            id: userId,
            email,
            password: hadPassword,
            fullName: fullName,
        })
        return
    }
    async login (authDto: AuthDto) {
        const { email, password } = authDto
        const userFound = await this.userRepository.findUserByEmail(email)


        console.log(userFound)
        if (!userFound.email) throw new UnAuthorisedRequestError('invalid credentials')
        console.log('hello')
        const isPasswordMatch = bcrypt.compareSync(password, userFound.password)
        console.log(isPasswordMatch)
        if (!isPasswordMatch)
            throw new UnAuthorisedRequestError('invalid credentials')

        const token = jwtHandler.generateToken(userFound.id)
        return token
    }


    async getLoogedInUser (userPayload: JwtPayload) {
        const { id } = userPayload
        const userFound = await this.userRepository.findUserById(id)
        if (!userFound) throw new UnAuthorisedRequestError()
        return userFound
    }
}