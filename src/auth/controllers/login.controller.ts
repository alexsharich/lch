import {Response, Request} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {authService} from "../services/auth.service";
import {jwtService} from "../../application/jwtService";
import {daysToMs} from "../../managers/daysToMs";

export type InputLoginType = {
    loginOrEmail: string,
    password: string
}

export const loginHandler = async (req: Request<{}, {}, InputLoginType>, res: Response) => {
    const userId = await authService.loginOrEmail(req.body)
    if (!userId) {
        res.sendStatus(HttpStatus.Unauthorized)
        return

    }
    const {accessToken, refreshToken} = jwtService.createToken(userId)
    res.cookie('refreshToken', refreshToken, {
        maxAge: (daysToMs(3)),
        httpOnly: true,
        secure: true
    })
    res.status(HttpStatus.Ok).json({accessToken})
    return
}