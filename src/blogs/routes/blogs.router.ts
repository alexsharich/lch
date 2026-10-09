import {Router, Request, Response} from "express";
import {blogsRepository} from "../repositories/blogs.repository";
import {InputBlogType} from "../dto/blogs.input.dto";
import {HttpStatus} from "../../core/types/http-statuses";

export const blogsRouter = Router({})

blogsRouter
    .get('', (req: Request, res: Response) => {
        const blogs = blogsRepository.allBlogs()
        res.sendStatus(HttpStatus.Ok).send(blogs)
    })
    .post('', (req: Request<{}, {}, InputBlogType>, res: Response) => {
        const blog = blogsRepository.createBlog(req.body)
        if (!blog) {
            res.sendStatus(HttpStatus.BadRequest)
            return
        }
        res.status(HttpStatus.Created).send(blog)
    })
    .get('/:id', (req: Request<{ id: string }>, res: Response) => {
        const blog = blogsRepository.findBlog(req.params.id)
        if (!blog) {
            return res.sendStatus(HttpStatus.NotFound)
        }
        res.status(HttpStatus.Ok).send(blog)
    })
    .put('/:id', (req: Request<{ id: string }, {}, InputBlogType>, res: Response) => {
        const blog = blogsRepository.updateBlog(req.params.id, req.body)
        if (!blog) {
            res.sendStatus(HttpStatus.NotFound)
            return
        }
        res.sendStatus(HttpStatus.NoContent)
    })
    .delete('/:id', (req: Request<{ id: string }>, res: Response) => {
        const isDeleted = blogsRepository.deleteBlog(req.params.id)
        if (!isDeleted) {
            return res.sendStatus(HttpStatus.NotFound)
        }
        res.sendStatus(HttpStatus.NoContent)
    })