import {Request, Response} from "express";
import {commentsService} from "../services/comments.service";
import {HttpStatus} from "../../core/types/http-statuses";

export const deleteCommentHandler = async (req: Request<{ commentId: string }>, res: Response) => {
    const userId = req.userId!
    const commentId = req.params.commentId

    const isDeletedComment = await commentsService.deleteComment(userId, commentId)
    if (isDeletedComment === "not found") {
        res.sendStatus(HttpStatus.NotFound)
        return
    }
    if (isDeletedComment === 'forbidden') {
        res.sendStatus(HttpStatus.Forbidden)
        return
    }
    res.sendStatus(HttpStatus.NoContent)
}