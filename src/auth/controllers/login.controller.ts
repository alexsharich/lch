import {Response, Request} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {authService} from "../services/auth.service";

export type InputLoginType = {
    loginOrEmail: string,
    password: string
}

export const loginHandler = async (req: Request<{}, {}, InputLoginType>, res: Response) => {
    const isLogined = await authService.loginOrEmail(req.body)
    if (!isLogined) {
        res.sendStatus(HttpStatus.Unauthorized)
        return
    }
    res.sendStatus(HttpStatus.NoContent)
}