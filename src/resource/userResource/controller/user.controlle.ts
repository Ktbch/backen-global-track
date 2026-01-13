import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { JwtPayload } from "jsonwebtoken";
import { ResponseHandler } from "../../../utils/response-handler";

export class UserController {
    userService: UserService

    constructor () {
        this.userService = new UserService()
    }

    handleLoadProfile = async (req: Request, res: Response, next: NextFunction) => {
        try
        {
            const profileDetails = await this.userService.getUserProfile(req.user as JwtPayload)
            res.status(200).json(profileDetails)
        } catch (error)
        {
            next(error)
        }
    }
}