import {Request, Response} from "express";
import {authService} from "../services/auth.service";
import {HttpStatus} from "../../core/types/http-statuses";

export const registrationConfirmationHandler = async (req: Request, res: Response) => {
    const result = await authService.confirmEmail(req.body.code)
    if (!result) {
        res.status(HttpStatus.BadRequest).send({
            "errorsMessages": [
                {
                    "message": "invalid code",
                    "field": "code"
                }
            ]
        })
        return
    } else {
        res.status(HttpStatus.NoContent).send()
    }
}