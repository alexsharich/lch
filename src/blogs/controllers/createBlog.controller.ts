import {Request, Response} from "express";
import {InputBlogType} from "../dto/blogs.input.dto";
import {HttpStatus} from "../../core/types/http-statuses";
import {blogsService} from "../services/blogs.service";

export async function createBlogHandler(req: Request<{}, {}, InputBlogType>, res: Response) {
    const blog = await blogsService.createBlog(req.body)
    if (!blog) {
        res.sendStatus(HttpStatus.BadRequest)
        return
    }
    res.status(HttpStatus.Created).send(blog)
}