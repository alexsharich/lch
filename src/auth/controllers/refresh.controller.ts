import {Request, Response} from "express";
import {authService} from "../services/auth.service";
import {jwtService} from "../../application/jwtService";
import {daysToMs} from "../../managers/daysToMs";
import {HttpStatus} from "../../core/types/http-statuses";

export const refreshTokenHandler = async (req: Request, res: Response) => {
    const oldRefreshToken = req.cookies.refreshToken
    const userId = req.userId
    if (!userId) {
        res.sendStatus(HttpStatus.Unauthorized)
        return
    }

    await authService.addTokenToBlackList(oldRefreshToken)
    const {accessToken, refreshToken} = jwtService.createToken(userId)
    res.cookie('refreshToken', refreshToken, {
        maxAge: (daysToMs(3)),
        httpOnly: true,
        secure: true
    })
    res.status(HttpStatus.Ok).json({accessToken})
}