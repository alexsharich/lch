import {Request, Response} from "express";
import {InputPostForBlogType} from "../../input-output-types/post-types";
import {blogsService} from "../services/blogs.service";
import {HttpStatus} from "../../core/types/http-statuses";
import {postsService} from "../../posts/services/posts.service";

export async function createPostForSelectedBlogHandler(req: Request<{
    id: string
}, {}, InputPostForBlogType>, res: Response) {

    const newPostCreated = await blogsService.createPostForSelectedBlog({blogId: req.params.id, body: req.body})
    if (newPostCreated === null) {
        res.sendStatus(408)
        return
    }
    const newPost = await postsService.findPost(newPostCreated)
    if (!newPost) {
        res.sendStatus(406)
        return
    }
    res.sendStatus(HttpStatus.Created).send(newPost)
}