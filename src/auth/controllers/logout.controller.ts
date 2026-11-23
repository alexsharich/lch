import {Request, Response} from "express";
import {authService} from "../services/auth.service";
import {HttpStatus} from "../../core/types/http-statuses";

export const logoutHandler = async (req: Request, res: Response) => {
    const oldRefreshToken = req.cookies.refreshToken

    const isAddToBlackList = await authService.addTokenToBlackList(oldRefreshToken)
    if (!isAddToBlackList) {
        res.status(HttpStatus.NotFound)
        return
    }
    res.clearCookie('refreshToken')
    res.status(HttpStatus.NoContent).send()
}