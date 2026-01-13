import { JwtPayload } from "jsonwebtoken";
import { UserRepository } from "../repository/user.repository";


export class UserService {
    userRepository: UserRepository

    constructor () {
        this.userRepository = new UserRepository()
    }

    async getUserProfile (payload: JwtPayload) {
        const { id } = payload
        return await this.userRepository.findUserById(id)
    }
}