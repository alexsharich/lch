import {Router} from "express";
import {AUTH_ROUTES} from "../constants/auth.paths";
import {loginHandler} from "../controllers/login.controller";

export const authRouter = Router({});
authRouter.
    post(AUTH_ROUTES.LOGIN,loginHandler)