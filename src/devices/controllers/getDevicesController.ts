import {HttpStatus} from "../../core/types/http-statuses";
import {Request, Response} from "express";
import {devicesService} from "../services/device.service";

export const getDevicesController = async (req: Request, res: Response) => {
    const userId = req.userId!
    const devices = await devicesService.getDevices(userId)
    res.status(HttpStatus.Ok).send(devices)
}