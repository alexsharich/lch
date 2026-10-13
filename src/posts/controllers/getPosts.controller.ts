import {Request, Response} from "express";
import {postsRepository} from "../repositories/posts.repository";
import {HttpStatus} from "../../core/types/http-statuses";

export async function getPostsHandler(req: Request, res: Response) {
    const posts = await postsRepository.allPosts()
    res.sendStatus(HttpStatus.Ok).send(posts)
}