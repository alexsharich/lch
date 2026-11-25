import {Request, Response} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {devicesService} from "../services/device.service";

export const deleteDevicesController = async (req: Request, res: Response) => {
    const userId = req.userId!
    const deviceId = req.deviceId!
    const result = await devicesService.deleteDevices(deviceId, userId)
    if (!result) {
        res.sendStatus(HttpStatus.Unauthorized)
        return
    }
    res.sendStatus(HttpStatus.NoContent)
}