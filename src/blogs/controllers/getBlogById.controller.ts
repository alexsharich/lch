import {Request, Response} from "express";
import {blogsRepository} from "../repositories/blogs.repository";
import {HttpStatus} from "../../core/types/http-statuses";

export async function getBlogByIdHandler(req: Request<{ id: string }>, res: Response) {
    const blog = await blogsRepository.findBlog(req.params.id)
    if (!blog) {
        return res.sendStatus(HttpStatus.NotFound)
    }
    res.status(HttpStatus.Ok).send(blog)
}