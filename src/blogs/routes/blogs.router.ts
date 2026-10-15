import {Router} from "express";
import {BLOGS_PATH, BLOGS_ROUTES} from "../constants/blogs.paths";
import {getBlogsHandler} from "../controllers/getBlogs.controller";
import {createBlogHandler} from "../controllers/createBlog.controller";
import {getBlogByIdHandler} from "../controllers/getBlogById.controller";
import {updateBlogHandler} from "../controllers/updateBlog.controller";
import {deleteBlog} from "../controllers/deleteBlog.controller";
import {blogValidators, findBlogValidator} from "../validations/blog.input-dto.validation";
import {adminMiddleware} from "../../global-middleware/admin.middleware";
import {createPostForSelectedBlogHandler} from "../controllers/createPostForSelectedBlog";
import {getPostsForSelectedBlogHandler} from "../controllers/getPostsForSelectedBlog.controller";
import {postForBlogValidator} from "../../posts/validations/postValidator";

export const blogsRouter = Router({})

blogsRouter
    .get(BLOGS_PATH, getBlogsHandler)
    .post(BLOGS_PATH, ...blogValidators, createBlogHandler)
    .get(BLOGS_ROUTES.BY_ID, getBlogByIdHandler)
    .get(BLOGS_ROUTES.POSTS_BY_ID, getPostsForSelectedBlogHandler)
    .post(BLOGS_ROUTES.POST_BY_ID, findBlogValidator, ...postForBlogValidator, createPostForSelectedBlogHandler)
    .put(BLOGS_ROUTES.BY_ID, findBlogValidator, ...blogValidators, updateBlogHandler)
    .delete(BLOGS_ROUTES.BY_ID, adminMiddleware, deleteBlog)