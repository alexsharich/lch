import {Router, Request, Response} from "express";
import {blogsRepository} from "../repositories/blogs.repository";

export type InputBlogType = {
    name: string
    description: string
    websiteUrl: string
}

export const blogsRouter = Router({})

blogsRouter
    .get('', (req: Request, res: Response) => {
        const blogs = blogsRepository.allBlogs()
        res.sendStatus(200).send(blogs)
    })
    .post('', (req: Request<{}, {}, InputBlogType>, res: Response) => {
        const blog = blogsRepository.createBlog(req.body)
        if (!blog) {
            res.sendStatus(400)
            return
        }
        res.status(201).send(blog)
    })
    .get('/:id', (req: Request<{ id: string }>, res: Response) => {
        const blog = blogsRepository.findBlog(req.params.id)
        if (!blog) {
            return res.sendStatus(404)
        }
        res.status(200).send(blog)
    })
    .put('/:id', (req: Request<{ id: string }, {}, InputBlogType>, res: Response) => {
        const blog = blogsRepository.updateBlog(req.params.id, req.body)
        if (!blog) {
            res.sendStatus(404)
            return
        }
        res.sendStatus(204)
    })
    .delete('/:id', (req: Request<{ id: string }>, res: Response) => {
        const isDeleted = blogsRepository.deleteBlog(req.params.id)
        if (!isDeleted) {
            return res.sendStatus(404)
        }
        res.sendStatus(204)
    })