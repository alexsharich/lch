import {Router} from "express";
import {AUTH_ROUTES} from "../constants/auth.paths";
import {loginHandler} from "../controllers/login.controller";
import {meHandler} from "../controllers/me.controller";
import {authMiddleware} from "../../global-middleware/auth.middleware";
import {authValidator, meValidator} from "../validations/auth.validator";

export const authRouter = Router({});
authRouter
    .post(AUTH_ROUTES.LOGIN, ...authValidator, loginHandler)
    .get(AUTH_ROUTES.ME, ...meValidator, authMiddleware, meHandler)