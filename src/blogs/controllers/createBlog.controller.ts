import {Request, Response} from "express";
import {InputBlogType} from "../dto/blogs.input.dto";
import {blogsRepository} from "../repositories/blogs.repository";
import {HttpStatus} from "../../core/types/http-statuses";

export async function createBlogHandler(req: Request<{}, {}, InputBlogType>, res: Response) {
    const blog = await blogsRepository.createBlog(req.body)
    if (!blog) {
        res.sendStatus(HttpStatus.BadRequest)
        return
    }
    res.status(HttpStatus.Created).send(blog)
}