import {Router} from "express";
import {POSTS_ROUTES} from "../constants/posts.paths";
import {getPostsHandler} from "../controllers/getPosts.controller";
import {createPostHandler} from "../controllers/createPost.controller";
import {getPostByIdHandler} from "../controllers/getPostById.controller";
import {updatePostHandler} from "../controllers/updatePost.controller";
import {deletePostHandler} from "../controllers/deletePost.controller";
import {commentContentValidator, postValidator} from "../validations/postValidator";
import {adminMiddleware} from "../../global-middleware/admin.middleware";
import {getCommentsForPostHandler} from "../controllers/getCommentsForPost.controller";
import {authMiddleware} from "../../global-middleware/auth.middleware";

export const postsRouter = Router({})

function createCommentForPostHandler() {

}

postsRouter
    .get(POSTS_ROUTES.ROOT, getPostsHandler)
    .post(POSTS_ROUTES.ROOT, ...postValidator, createPostHandler)
    .get(POSTS_ROUTES.BY_ID, getPostByIdHandler)
    .put(POSTS_ROUTES.BY_ID, adminMiddleware, updatePostHandler)
    .delete(POSTS_ROUTES.BY_ID, adminMiddleware, deletePostHandler)
    .get(POSTS_ROUTES.POSTS_FOR_COMMENT, getCommentsForPostHandler)
    .post(POSTS_ROUTES.POSTS_FOR_COMMENT, authMiddleware, ...commentContentValidator, createCommentForPostHandler)