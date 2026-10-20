import {Request, Response} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {blogsService} from "../services/blogs.service";

export async function deleteBlog(req: Request<{ id: string }>, res: Response) {
    const isDeleted = await blogsService.deleteBlog(req.params.id)
    if (!isDeleted) {
        return res.sendStatus(HttpStatus.NotFound)
    }
    res.sendStatus(HttpStatus.NoContent)
}