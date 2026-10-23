import express from "express";
import {blogsRouter} from "./blogs/routes/blogs.router";
import {postsRouter} from "./posts/routes/posts.router";
import {authRouter} from "./auth/routes/auth.router";
import bodyParser from 'body-parser'
import cors from 'cors'
import {usersRouter} from "./users/routes/users.router";
import {POSTS_PATH} from "./posts/constants/posts.paths";
import {BLOGS_PATH} from "./blogs/constants/blogs.paths";
import {USERS_PATH} from "./users/constants/users.paths";
import {AUTH_PATH} from "./auth/constants/auth.paths";

export const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.status(200).json({version: '1.0'})
})
app.use(POSTS_PATH, postsRouter)
app.use(BLOGS_PATH, blogsRouter)
app.use(USERS_PATH, usersRouter)
app.use(AUTH_PATH, authRouter)