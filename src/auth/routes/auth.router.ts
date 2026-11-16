import {Router} from "express";
import {AUTH_ROUTES} from "../constants/auth.paths";
import {loginHandler} from "../controllers/login.controller";
import {meHandler} from "../controllers/me.controller";
import {authMiddleware} from "../../global-middleware/auth.middleware";
import {
    authValidator,
    emailCodeResendingValidator,
    isCreatedUserValidator,
    meValidator,
    registrationValidator
} from "../validations/auth.validator";
import {registrationHandler} from "../controllers/registration.controller";
import {registrationConfirmationHandler} from "../controllers/registration.confirmation.controller";
import {resendingEmailHandler} from "../controllers/registration.email.resending.controller";
import {emailValidator} from "../../users/validations/userValidator";

export const authRouter = Router({});
authRouter
    .post(AUTH_ROUTES.LOGIN, ...authValidator, loginHandler)
    .post(AUTH_ROUTES.REGISTRATION_CONFIRMATION, emailCodeResendingValidator, registrationConfirmationHandler)
    .post(AUTH_ROUTES.REGISTRATION, registrationValidator, isCreatedUserValidator, registrationHandler)
    .post(AUTH_ROUTES.REGISTRATION_EMAIL_RESENDING,emailValidator, resendingEmailHandler)
    .get(AUTH_ROUTES.ME, ...meValidator, authMiddleware, meHandler)