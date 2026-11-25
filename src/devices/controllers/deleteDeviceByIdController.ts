import {Request, Response} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {devicesService} from "../services/device.service";

export const deleteDeviceByIdController = async (req: Request<{ deviceId: string }>, res: Response) => {
    const userId = req.userId
    const deviceId = req.params.deviceId
    if (!userId || !deviceId) {
        res.sendStatus(HttpStatus.Unauthorized)
        return
    }
    const result = await devicesService.deleteDeviceById(deviceId, userId)
    res.sendStatus(result)
}