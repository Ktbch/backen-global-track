import { AuthDto, createAccountDto } from "../../../lib/zod.schema";
import { UserRepository } from "../../userResource/repository/user.repository";
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { UnAuthorisedRequestError } from "../../../utils/app-error";
import { jwtHandler } from "../../../utils/Jwt-handle";
import { JwtPayload } from "jsonwebtoken";
import { SesssionRepository } from "../repository/session.repository";


// TODO CREATE USER AND LOGIN USER AND LOGOUT USE WITH COOKIES. AND MIDDLEWARE FOR VALIDATION,  ROLE AND AUTHGUARD

// could have user email but decided to useId
export class AuthService {
    userRepository: UserRepository
    sessionRepository: SesssionRepository

    constructor () {
        this.userRepository = new UserRepository()
        this.sessionRepository = new SesssionRepository()
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


        if (!userFound) throw new UnAuthorisedRequestError('invalid credentials')
        const isPasswordMatch = await bcrypt.compare(password, userFound.password)

        if (!isPasswordMatch)
            throw new UnAuthorisedRequestError('invalid credentials')



        const token = jwtHandler.generateToken(userFound.id)
        const refreshToken = jwtHandler.generateRefreshToken()


        // this.sessionRepository.createSession({
        //     id: uuidv4(),
        //     user_id: userFound.id,
        //     refresh_token_hash: jwtHandler.hashToken(refreshToken),
        //     ip:meta.ip
        // })

        return token
    }


    async getLoogedInUser (userPayload: JwtPayload) {
        const { id } = userPayload
        const userFound = await this.userRepository.findUserById(id)
        if (!userFound) throw new UnAuthorisedRequestError()
        return userFound
    }
}