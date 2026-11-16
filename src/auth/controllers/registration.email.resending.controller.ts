import {authService} from "../services/auth.service";
import {HttpStatus} from "../../core/types/http-statuses";
import {Request,Response} from "express"

export const resendingEmailHandler = async (req: Request, res: Response) => {
    const user = await authService.resendingEmail(req.body.email)
    if(!user){
        res.status(HttpStatus.BadRequest).send({ errorsMessages: [{ message: '123123', field: "email" }] })
        return
    }
    res.status(HttpStatus.NoContent).send()
}