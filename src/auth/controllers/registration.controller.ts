import {Request,Response} from "express";
import {authService} from "../services/auth.service";
import {HttpStatus} from "../../core/types/http-statuses";

export const registrationHandler
    = async (req:Request,res:Response)=>{
    const user = await authService.createUser(req.body.login,req.body.email,req.body.password)
    if(user){
        res.status(HttpStatus.NoContent).send()
    }else {
        res.status(HttpStatus.BadRequest).send( { errorsMessages: [{ message: "Email error", field: "email" }] })
    }
}