import {Request, Response} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {usersQueryRepository} from "../repositories/users.query.repository";
import {paginationQueriesForUsers, PaginationQueriesUsersType} from "../../helpers/pagination-values";

export const allUsersHandler = async (req: Request<{}, {}, {}, PaginationQueriesUsersType>, res: Response) => {
    const sortFilter = paginationQueriesForUsers(req.query)

    const users = await usersQueryRepository.allUsers(sortFilter)
    res.status(HttpStatus.Ok).json(users)
}