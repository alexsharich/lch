import {Request, Response} from "express";
import {blogsRepository} from "../../blogs/repositories/blogs.repository";
import {HttpStatus} from "../../core/types/http-statuses";
import {InputPostType} from "../dto/posts.input.dto";
import {postsService} from "../services/posts.service";

export async function createPostHandler(req: Request<any, any, InputPostType>, res: Response) {
    const blog = await blogsRepository.findBlog(req.body.blogId)
    if (!blog) {
        return res.sendStatus(HttpStatus.NotFound)
    }
    const post = await postsService.createPost(req.body)
    if (!post) {
        return res.sendStatus(HttpStatus.BadRequest)
    }
    res.sendStatus(HttpStatus.Created).send(post)
}