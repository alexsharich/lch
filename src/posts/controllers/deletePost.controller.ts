import {Request, Response} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {postsService} from "../services/posts.service";

export async function deletePostHandler(req: Request, res: Response) {
    const postId = req.params.id as string
    const isDeleted = await postsService.deletePost(postId)
    if (!isDeleted) {
        return res.sendStatus(HttpStatus.NotFound)
    }
    res.sendStatus(HttpStatus.NoContent)
}