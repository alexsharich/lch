import {Response, Request} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {authService} from "../services/auth.service";
import {jwtService} from "../../application/jwtService";

export type InputLoginType = {
    loginOrEmail: string,
    password: string
}

export const loginHandler = async (req: Request<{}, {}, InputLoginType>, res: Response) => {
    const userId = await authService.loginOrEmail(req.body)
    if (userId) {
        const accessToken = jwtService.createToken(userId)
        res.status(HttpStatus.Ok).json({accessToken})
        return
    }
    res.sendStatus(HttpStatus.Unauthorized)
}