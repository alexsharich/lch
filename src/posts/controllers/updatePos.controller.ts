import {Request, Response} from "express";
import {blogsRepository} from "../../blogs/repositories/blogs.repository";
import {HttpStatus} from "../../core/types/http-statuses";
import {postsRepository} from "../repositories/posts.repository";

export function updatePostHandler(req: Request, res: Response)  {
    const blog = blogsRepository.findBlog('1')
    if (!blog) {
        return res.sendStatus(HttpStatus.NotFound)
    }
    const postId = req.params.id as string
    const updatedPost = postsRepository.updatePost(blog.name, postId, req.body)
    if (!updatedPost) {
        return res.sendStatus(HttpStatus.NotFound)
    }
    res.sendStatus(HttpStatus.NoContent)
}