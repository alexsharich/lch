import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwtService";
import {authService} from "../auth/services/auth.service";
import {HttpStatus} from "../core/types/http-statuses";

export const authRefreshMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken as string

    if (!refreshToken) {
        res.sendStatus(HttpStatus.Unauthorized)
        return
    }
    const token = jwtService.verifyRefreshToken(refreshToken)
    if (!token) {
        res.sendStatus(HttpStatus.Unauthorized)
        return
    }
    const userId = token.userId
    const checkNewTokenInBlackList = await authService.checkTokenInBlackList(refreshToken)
    if (checkNewTokenInBlackList) {
        res.sendStatus(HttpStatus.Unauthorized)
        return
    }
    req.userId = userId
    next()
}