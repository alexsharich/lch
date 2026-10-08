import {Request, Response, Router} from "express";
import {postsRepository} from "../../repositories/posts.repository";
import {blogsRepository} from "../../blogs/repositories/blogs.repository";

export type InputPostType = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}

export const postsRouter = Router({})
postsRouter
    .get('', (req: Request, res: Response) => {
        const posts = postsRepository.allPosts()
        res.sendStatus(200).send(posts)
    })
    .post('', (req: Request, res: Response) => {
        const blog = blogsRepository.findBlog('1')
        if (!blog) {
            return res.sendStatus(404)
        }
        const post = postsRepository.createPost(blog.id, blog.name, req.body)
        if (!post) {
            return res.sendStatus(400)
        }
        res.sendStatus(201).send(post)
    })
    .get('/:id', (req: Request, res: Response) => {
        const postId = req.params.id as string
        const post = postsRepository.findPost(postId)
        if (!post) {
            return res.sendStatus(404)
        }
        res.sendStatus(200).send(post)
    })
    .put('/:id', (req: Request, res: Response) => {
        const blog = blogsRepository.findBlog('1')
        if (!blog) {
            return res.sendStatus(404)
        }
        const postId = req.params.id as string
        const updatedPost = postsRepository.updatePost(blog.name, postId, req.body)
        if (!updatedPost) {
            return res.sendStatus(404)
        }
        res.sendStatus(204)
    })
    .delete('/:id', (req: Request, res: Response) => {
        const postId = req.params.id as string
        const isDeleted = postsRepository.deletePost(postId)
        if (!isDeleted) {
            return res.sendStatus(404)
        }
        res.sendStatus(204)
    })