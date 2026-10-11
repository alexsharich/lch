import {Request, Response} from "express";
import {blogsRepository} from "../../blogs/repositories/blogs.repository";
import {HttpStatus} from "../../core/types/http-statuses";
import {postsRepository} from "../repositories/posts.repository";

export function createPostHandler(req: Request, res: Response) {
    const blog = blogsRepository.findBlog('1')
    if (!blog) {
        return res.sendStatus(HttpStatus.NotFound)
    }
    const post = postsRepository.createPost(blog.id, blog.name, req.body)
    if (!post) {
        return res.sendStatus(HttpStatus.BadRequest)
    }
    res.sendStatus(HttpStatus.Created).send(post)
}