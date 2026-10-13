import {Request, Response} from "express";
import {blogsRepository} from "../repositories/blogs.repository";
import {HttpStatus} from "../../core/types/http-statuses";

export async function deleteBlog(req: Request<{ id: string }>, res: Response) {
    const isDeleted = await blogsRepository.deleteBlog(req.params.id)
    if (!isDeleted) {
        return res.sendStatus(HttpStatus.NotFound)
    }
    res.sendStatus(HttpStatus.NoContent)
}