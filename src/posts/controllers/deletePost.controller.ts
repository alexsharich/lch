import {Request, Response} from "express";
import {postsRepository} from "../repositories/posts.repository";
import {HttpStatus} from "../../core/types/http-statuses";

export async function deletePostHandler(req: Request, res: Response)  {
    const postId = req.params.id as string
    const isDeleted = await postsRepository.deletePost(postId)
    if (!isDeleted) {
        return res.sendStatus(HttpStatus.NotFound)
    }
    res.sendStatus(HttpStatus.NoContent)
}