import {Request, Response} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {postsService} from "../services/posts.service";
import {InputPostType} from "../dto/posts.input.dto";
import {blogsRepository} from "../../blogs/repositories/blogs.repository";

export async function updatePostHandler(req: Request<{ id: string }, any, InputPostType>, res: Response) {
    const blog = await blogsRepository.findBlog(req.body.blogId)
    if(!blog){
        return res.sendStatus(HttpStatus.NotFound)
    }
    const postId = req.params.id as string
    const updatedPost = await postsService.updatePost({params: postId, body: req.body})
    if (!updatedPost) {
        return res.sendStatus(HttpStatus.NotFound)
    }
    res.sendStatus(HttpStatus.NoContent)
}