import {Request, Response} from "express";
import {blogsRepository} from "../../blogs/repositories/blogs.repository";
import {HttpStatus} from "../../core/types/http-statuses";
import {postsRepository} from "../repositories/posts.repository";

export async function updatePostHandler(req: Request, res: Response) {
    const blog = await blogsRepository.findBlog('1')
    if (!blog) {
        return res.sendStatus(HttpStatus.NotFound)
    }
    const postId = req.params.id as string
    const updatedPost = await postsRepository.updatePost(blog.name, postId, req.body)
    if (!updatedPost) {
        return res.sendStatus(HttpStatus.NotFound)
    }
    res.sendStatus(HttpStatus.NoContent)
}