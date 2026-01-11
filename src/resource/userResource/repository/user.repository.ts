import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { profiles, user_roles } from "../../../db/schema";


type UserDto = {
    id: string,
    fullName: string,
    email: string,
    password: string,
}

export class UserRepository {
    db: typeof db

    constructor () {
        this.db = db
    }

    async createUser (userDto: UserDto) {
        return await this.db.insert(profiles)
            .values({ id: userDto.id, email: userDto.email, password: userDto.password, full_name: userDto.fullName })
    }

    async findUserByEmail (email: string) {
        const users = await this.db.select().from(profiles).where(eq(profiles.email, email))
        return users[ 0 ] ?? null
    }
    async findUserById (id: string) {
        const users = await this.db.select().from(profiles).where(eq(profiles.id, id))
        return users[ 0 ] ?? null
    }
    async getUserRole (id: string) {
        const userRole = await this.db.select({ role: user_roles.role }).from(user_roles).where(eq(user_roles.user_id, id))
        return userRole[ 0 ] ?? null
    }
}