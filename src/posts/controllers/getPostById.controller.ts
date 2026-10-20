import {Request, Response} from "express";
import {postsRepository} from "../repositories/posts.repository";
import {HttpStatus} from "../../core/types/http-statuses";

export async function getPostByIdHandler(req: Request, res: Response)  {
    const postId = req.params.id as string
    const post = await postsRepository.findPost(postId)
    if (!post) {
        return res.sendStatus(HttpStatus.NotFound)
    }
    res.sendStatus(HttpStatus.Ok).send(post)
}