import {Request, Response} from "express";
import {InputBlogType} from "../dto/blogs.input.dto";
import {blogsRepository} from "../repositories/blogs.repository";
import {HttpStatus} from "../../core/types/http-statuses";

export function updateBlogHandler(req: Request<{ id: string }, {}, InputBlogType>, res: Response)  {
    const blog = blogsRepository.updateBlog(req.params.id, req.body)
    if (!blog) {
        res.sendStatus(HttpStatus.NotFound)
        return
    }
    res.sendStatus(HttpStatus.NoContent)
}