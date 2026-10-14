import {Request, Response} from "express";
import {blogsRepository} from "../../blogs/repositories/blogs.repository";
import {HttpStatus} from "../../core/types/http-statuses";
import {postsRepository} from "../repositories/posts.repository";
import {InputPostType} from "../dto/posts.input.dto";

export async function createPostHandler(req: Request<any, any, InputPostType>, res: Response) {
    const blog = await blogsRepository.findBlog(req.body.blogId)
    if (!blog) {
        return res.sendStatus(HttpStatus.NotFound)
    }
    const post = await postsRepository.createPost(req.body)
    if (!post) {
        return res.sendStatus(HttpStatus.BadRequest)
    }
    res.sendStatus(HttpStatus.Created).send(post)
}