import {Request, Response} from "express";
import {blogsRepository} from "../repositories/blogs.repository";
import {HttpStatus} from "../../core/types/http-statuses";

export function getBlogByIdHandler(req: Request<{ id: string }>, res: Response) {
    const blog = blogsRepository.findBlog(req.params.id)
    if (!blog) {
        return res.sendStatus(HttpStatus.NotFound)
    }
    res.status(HttpStatus.Ok).send(blog)
}