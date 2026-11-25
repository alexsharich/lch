import {Response, Request} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {authService} from "../services/auth.service";
import {jwtService} from "../../application/jwtService";
import {daysToMs} from "../../managers/daysToMs";
import {ObjectId} from "mongodb";
import {UAParser} from 'ua-parser-js';
import {devicesService} from "../../devices/services/device.service";

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
    const _id = new ObjectId()
    const {accessToken, refreshToken} = jwtService.createToken(userId)
    const decodedRefreshToken = jwtService.decodeToken(refreshToken)
    const ip = req.ip || '1'
    const {browser, device } = UAParser(req.headers['user-agent'])
    const deviceName = device.model || '' + browser.name || ''

    try {
        await devicesService.saveDevice(_id,ip,deviceName,new Date(decodedRefreshToken?.iat! * 1000).toISOString(),String(decodedRefreshToken?.userId),new Date(decodedRefreshToken?.exp! *1000).toISOString())
    }catch(error){
        throw new Error('Error')
    }
    res.cookie('refreshToken', refreshToken, {
        maxAge: (daysToMs(3)),
        httpOnly: true,
        secure: true
    })
    res.status(HttpStatus.Ok).json({accessToken})
    return
}