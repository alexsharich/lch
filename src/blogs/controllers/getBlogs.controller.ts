import {Request, Response} from "express";
import {blogsRepository} from "../repositories/blogs.repository";
import {HttpStatus} from "../../core/types/http-statuses";

export async function getBlogsHandler(req: Request, res: Response) {
    const blogs = await blogsRepository.allBlogs()
    res.sendStatus(HttpStatus.Ok).send(blogs)
}