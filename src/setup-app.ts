import express, {Express} from "express";
import {driversRouter} from "./drivers/routers/drivers.router";
import {testingRouter} from "./testing/testing.router";
import {blogsRouter} from "./blogs/routes/blogs.router";
import {postsRouter} from "./posts/routes/posts.router";
import {BLOGS_PATH} from "./blogs/constants/blogs.paths";
import {POSTS_PATH} from "./posts/constants/posts.paths";

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get("/", (req, res) => {
        res.status(200).send("Hello world!");
    });
    app.use(BLOGS_PATH,blogsRouter)
    app.use(POSTS_PATH,postsRouter)
    app.use('/drivers', driversRouter)
    app.use('testing', testingRouter)
};