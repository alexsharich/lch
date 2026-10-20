import {Request, Response} from "express";
import {InputBlogType} from "../dto/blogs.input.dto";
import {HttpStatus} from "../../core/types/http-statuses";
import {blogsService} from "../services/blogs.service";

export async function updateBlogHandler(req: Request<{ id: string }, {}, InputBlogType>, res: Response) {
    const blog = await blogsService.updateBlog({params: req.params.id, body: req.body})
    if (!blog) {
        res.sendStatus(HttpStatus.NotFound)
        return
    }
    res.sendStatus(HttpStatus.NoContent)
}