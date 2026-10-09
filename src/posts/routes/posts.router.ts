import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts.repository";
import {blogsRepository} from "../../blogs/repositories/blogs.repository";
import {HttpStatus} from "../../core/types/http-statuses";

export const postsRouter = Router({})
postsRouter
    .get('', (req: Request, res: Response) => {
        const posts = postsRepository.allPosts()
        res.sendStatus(HttpStatus.Ok).send(posts)
    })
    .post('', (req: Request, res: Response) => {
        const blog = blogsRepository.findBlog('1')
        if (!blog) {
            return res.sendStatus(HttpStatus.NotFound)
        }
        const post = postsRepository.createPost(blog.id, blog.name, req.body)
        if (!post) {
            return res.sendStatus(HttpStatus.BadRequest)
        }
        res.sendStatus(HttpStatus.Created).send(post)
    })
    .get('/:id', (req: Request, res: Response) => {
        const postId = req.params.id as string
        const post = postsRepository.findPost(postId)
        if (!post) {
            return res.sendStatus(HttpStatus.NotFound)
        }
        res.sendStatus(HttpStatus.Ok).send(post)
    })
    .put('/:id', (req: Request, res: Response) => {
        const blog = blogsRepository.findBlog('1')
        if (!blog) {
            return res.sendStatus(HttpStatus.NotFound)
        }
        const postId = req.params.id as string
        const updatedPost = postsRepository.updatePost(blog.name, postId, req.body)
        if (!updatedPost) {
            return res.sendStatus(HttpStatus.NotFound)
        }
        res.sendStatus(HttpStatus.NoContent)
    })
    .delete('/:id', (req: Request, res: Response) => {
        const postId = req.params.id as string
        const isDeleted = postsRepository.deletePost(postId)
        if (!isDeleted) {
            return res.sendStatus(HttpStatus.NotFound)
        }
        res.sendStatus(HttpStatus.NoContent)
    })