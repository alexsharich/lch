import {Router} from "express";
import {deleteCommentHandler} from "../controllers/deleteComment.controller";
import {updateCommentHandler} from "../controllers/updateComment.controller";
import {getCommentHandler} from "../controllers/getComment.controller";
import {COMMENTS_ROUTES} from "../constants/comments.paths";

export const commentsRouter = Router({})

commentsRouter
    .get(COMMENTS_ROUTES.BY_ID, getCommentHandler)
    .put(COMMENTS_ROUTES.BY_COMMENT_ID, updateCommentHandler)
    .delete(COMMENTS_ROUTES.BY_COMMENT_ID, deleteCommentHandler)