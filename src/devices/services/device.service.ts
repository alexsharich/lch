import {ObjectId} from "mongodb";
import {Device} from "../types/deviceDBType";
import {devicesRepository} from "../repositories/devices.repositories";
import {devicesCollection} from "../../db/mongo.db";
import {queryDevicesRepository} from "../repositories/devices.query.repositories";

enum STATUS_CODE_DEVICES {
    NO_CONTENT = 204,
    NOT_FOUND = 404,
    FORBIDDEN = 403
}

export const devicesService = {
    async saveDevice(_id: ObjectId, ip: string, deviceName: string, createdAt: string, userId: string, expAt: string) {
        const device = new Device(ip, deviceName, createdAt, userId, expAt)
        await devicesRepository.createDevice(_id, device)
        return
    },
    async deleteDeviceById(deviceId: string, userId: string): Promise<STATUS_CODE_DEVICES> {
        const device = await devicesRepository.getDeviceById(deviceId)
        if (!device) {
            return STATUS_CODE_DEVICES.NOT_FOUND
        }
        if (device.userId !== userId) {
            return STATUS_CODE_DEVICES.FORBIDDEN
        }
        await devicesCollection.deleteOne({_id: new ObjectId(deviceId)})
        return STATUS_CODE_DEVICES.NO_CONTENT
    },
    async deleteDevices(deviceId: string, userId: string): Promise<boolean> {
        const result = await devicesRepository.deleteDevices(userId, deviceId)
        return result
    },
    async updateDevice(deviceId: ObjectId, expAt: string, createdAt: string) {
        await devicesRepository.updateDevice(deviceId, expAt, createdAt)
    },
    async getDevices(userId: string) {
        return await queryDevicesRepository.getDevices(userId)
    }
}