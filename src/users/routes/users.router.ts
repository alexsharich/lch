import {Router} from "express";
import {USERS_ROUTES} from "../constants/users.paths";
import {allUsersHandler} from "../controllers/allUsers.controller";
import {createUserHandler} from "../controllers/createUser.controller";
import {deleteUserHandler} from "../controllers/deleteUser.controller";
import {adminMiddleware} from "../../global-middleware/admin.middleware";
import {userValidator} from "../validations/userValidator";

export const usersRouter = Router({})
usersRouter
    .get(USERS_ROUTES.ROOT, allUsersHandler)
    .post(USERS_ROUTES.ROOT, adminMiddleware, ...userValidator, createUserHandler)
    .delete(USERS_ROUTES.BY_ID, adminMiddleware, deleteUserHandler)