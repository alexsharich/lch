import {Request, Response} from "express";
import {postsRepository} from "../repositories/posts.repository";
import {paginationQueries, PaginationQueriesType} from "../../helpers/pagination-values";
import {HttpStatus} from "../../core/types/http-statuses";

export async function getPostsHandler(req: Request<{},{},{},PaginationQueriesType>, res: Response) {
    const sortFilter = paginationQueries(req.query)
    const posts = await postsRepository.allPosts(sortFilter)
    if (posts) {
        res.sendStatus(HttpStatus.Ok).json(posts)
    }
}