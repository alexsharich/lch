import {Request, Response} from "express";
import {blogsRepository} from "../../blogs/repositories/blogs.repository";
import {HttpStatus} from "../../core/types/http-statuses";
import {postsRepository} from "../repositories/posts.repository";

export async function createPostHandler(req: Request, res: Response) {
    const blog = await blogsRepository.findBlog('1')
    if (!blog) {
        return res.sendStatus(HttpStatus.NotFound)
    }
    const post = await postsRepository.createPost(blog.id, blog.name, req.body)
    if (!post) {
        return res.sendStatus(HttpStatus.BadRequest)
    }
    res.sendStatus(HttpStatus.Created).send(post)
}