import { InferInsertModel } from "drizzle-orm";
import { db } from "../../../db";
import { sessions } from "../../../db/schema";


export type SessionDto = InferInsertModel<typeof sessions>

export class SesssionRepository {
    db: typeof db

    constructor () {
        this.db = db
    }

    async createSession (newSession: SessionDto) {
        await this.db.insert(sessions).values(newSession)
        return
    }
}