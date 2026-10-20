import {HttpStatus} from "../../core/types/http-statuses";
import {Request, Response} from "express";
import {usersService} from "../services/users.service";


export const deleteUserHandler = async (req: Request<{ id: string }>, res: Response) => {
    const isDeleted = await usersService.deleteUser(req.params.id)
    if (!isDeleted) {
        return res.sendStatus(HttpStatus.NotFound)
    }
    res.sendStatus(HttpStatus.NoContent)
}