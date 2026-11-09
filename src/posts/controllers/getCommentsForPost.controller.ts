import {Request,Response} from 'express'
import {paginationQueriesComment, PaginationQueriesCommentType} from "../../helpers/pagination-values";
import {commentsQueryRepository} from "../../comments/repositories/comments.query.repository";
import {postsQueryRepository} from "../repositories/posts.query.repository";
import {HttpStatus} from "../../core/types/http-statuses";

export const getCommentsForPostHandler =async (req: Request<{id:string}, {},{}, PaginationQueriesCommentType>, res: Response)=>{
    const postId = req.params.id
    const isPostExist = await postsQueryRepository.findPost(postId)
    if(!isPostExist){
        res.sendStatus(HttpStatus.NotFound)
        return
    }
    const sortFilter = paginationQueriesComment(req.query)
    const posts = await commentsQueryRepository.getComments(sortFilter,postId)
    if (posts) {
        res.status(HttpStatus.Ok).json(posts)
        return
    }
}