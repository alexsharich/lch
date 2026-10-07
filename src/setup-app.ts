import express, {Express} from "express";
import {driversRouter} from "./drivers/routers/drivers.router";
import {testingRouter} from "./testing/testing.router";
import {blogsRouter} from "./blogs/routes/blogs.router";

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get("/", (req, res) => {
        res.status(200).send("Hello world!");
    });
    app.use('/blogs',blogsRouter)
    app.use('/drivers', driversRouter)
    app.use('testing', testingRouter)
    return app;
};