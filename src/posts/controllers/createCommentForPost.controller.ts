import {postsQueryRepository} from "../repositories/posts.query.repository";
import {usersQueryRepository} from "../../users/repositories/users.query.repository";
import {commentsService} from "../../comments/services/comments.service";
import {InputCommentType} from "../../input-output-types/comment-types";
import {Request, Response} from "express";
import {HttpStatus} from "../../core/types/http-statuses";


export const createCommentForPostHandler = async (req: Request<{
    id: string
}, any, InputCommentType>, res: Response) => {
    const userId = req.userId
    const isPostExist = await postsQueryRepository.findPost(req.params.id)
    if (!isPostExist) {
        res.sendStatus(HttpStatus.NotFound)
        return
    }
    if (userId) {
        const user = await usersQueryRepository.findUser(userId)
        if (user !== null) {
            const createdComment = await commentsService.createComment({
                userId: userId,
                userLogin: user.login,
                postId: req.params.id,
                comment: req.body.content
            })
            if (createdComment) {
                res.status(HttpStatus.Created).send(createdComment)
                return
            }
        }
    }
}