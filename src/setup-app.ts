import express, {Express} from "express";
import {driversRouter} from "./drivers/routers/drivers.router";
import {testingRouter} from "./testing/testing.router";
import {blogsRouter} from "./blogs/routes/blogs.router";
import {postsRouter} from "./posts/routes/posts.router";

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get("/", (req, res) => {
        res.status(200).send("Hello world!");
    });
    app.use('/blogs',blogsRouter)
    app.use('/posts',postsRouter)
    app.use('/drivers', driversRouter)
    app.use('testing', testingRouter)
    return app;
};