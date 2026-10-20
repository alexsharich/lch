import {Request, Response} from "express";
import {blogsRepository} from "../repositories/blogs.repository";
import {HttpStatus} from "../../core/types/http-statuses";
import {paginationQueries, PaginationQueriesType} from "../../helpers/pagination-values";

export async function getBlogsHandler(req: Request<{}, {}, {}, PaginationQueriesType>, res: Response) {
    const sortFilter = paginationQueries(req.query)
    const blogs = await blogsRepository.allBlogs(sortFilter)
    if (blogs) {
        res.sendStatus(HttpStatus.Ok).send(blogs)
    }
}