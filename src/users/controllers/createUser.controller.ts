import {HttpStatus} from "../../core/types/http-statuses";
import {Request,Response} from "express";
import {InputUserType} from "../dto/users.input.type";
import {usersService} from "../services/users.service";
import {usersQueryRepository} from "../repositories/users.query.repository";

export const createUserHandler = async(req:Request<{},{},InputUserType>,res:Response)=>{
    const isNewUserCreated = await usersService.createUser(req.body)

    if(Array.isArray(isNewUserCreated)){
        res.status(400).json({
            errorsMessages: isNewUserCreated
        })
        return
    }


    const newUser = await usersQueryRepository.findUser(isNewUserCreated as string)
    if (newUser) {
        res.status(201).json(newUser)
        return
    }

    res.sendStatus(HttpStatus.NoContent)
}