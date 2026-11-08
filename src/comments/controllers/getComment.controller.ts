import {Request, Response} from "express";
import {commentsQueryRepository} from "../repositories/comments.query.repository";
import {HttpStatus} from "../../core/types/http-statuses";


export const getCommentHandler = async (req: Request<{ id: string }>, res: Response) => {
    const comment = await commentsQueryRepository.findComment(req.params.id)
    if (!comment) {
        res.sendStatus(HttpStatus.NotFound)
        return
    }
    res.status(HttpStatus.Ok).send(comment)
}