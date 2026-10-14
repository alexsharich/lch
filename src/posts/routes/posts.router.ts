import {Router} from "express";
import {POSTS_ROUTES} from "../constants/posts.paths";
import {getPostsHandler} from "../controllers/getPosts.controller";
import {createPostHandler} from "../controllers/createPost.controller";
import {getPostByIdHandler} from "../controllers/getPostById.controller";
import {updatePostHandler} from "../controllers/updatePost.controller";
import {deletePostHandler} from "../controllers/deletePost.controller";
import {postValidator} from "../validations/postValidator";
import {adminMiddleware} from "../../global-middleware/admin.middleware";

export const postsRouter = Router({})
postsRouter
    .get(POSTS_ROUTES.ROOT, getPostsHandler)
    .post(POSTS_ROUTES.ROOT, ...postValidator, createPostHandler)
    .get(POSTS_ROUTES.BY_ID, getPostByIdHandler)
    .put(POSTS_ROUTES.BY_ID, adminMiddleware, updatePostHandler)
    .delete(POSTS_ROUTES.BY_ID, adminMiddleware, deletePostHandler)