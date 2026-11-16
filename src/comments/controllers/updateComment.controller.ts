import {Request, Response} from "express";
import {InputCommentType} from "../../input-output-types/comment-types";
import {commentsService} from "../services/comments.service";
import {HttpStatus} from "../../core/types/http-statuses";

export const updateCommentHandler = async (req: Request<{
    commentId: string
}, {}, InputCommentType>, res: Response) => {
    const userId = req.userId!
    const commentId = req.params.commentId
    const content = req.body.content

    const isСommentUpdated = await commentsService.updateComment(userId, commentId, content)
    if (isСommentUpdated === "not found") {
        res.sendStatus(HttpStatus.NotFound)
        return
    }
    if (isСommentUpdated === 'forbidden') {
        res.sendStatus(HttpStatus.Forbidden)
        return
    }
    res.sendStatus(HttpStatus.NoContent)
}