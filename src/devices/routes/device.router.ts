import {authRefreshMiddleware} from "../../global-middleware/auth_refresh.middleware";
import {getDevicesController} from "../controllers/getDevicesController";
import {deleteDevicesController} from "../controllers/deleteDevicesController";
import {deleteDeviceByIdController} from "../controllers/deleteDeviceByIdController";
import {Router} from "express";
import {DEVICES_PATH, DEVICES_ROUTES} from "../constants/device.paths";

export const devicesRouter = Router()

devicesRouter.get(DEVICES_ROUTES.ROOT, authRefreshMiddleware, getDevicesController)
devicesRouter.delete(DEVICES_PATH, authRefreshMiddleware, deleteDevicesController)
devicesRouter.delete(DEVICES_ROUTES.BY_ID, authRefreshMiddleware, deleteDeviceByIdController)