import {Request,Response} from "express";
import {paginationQueries, PaginationQueriesType} from "../../helpers/pagination-values";
import {blogsRepository} from "../repositories/blogs.repository";
import {HttpStatus} from "../../core/types/http-statuses";
import {postsRepository} from "../../posts/repositories/posts.repository";

export async function getPostsForSelectedBlogHandler(req:Request<{id:string},{},{},PaginationQueriesType>,res:Response){
    const {pageNumber, pageSize, sortBy, sortDirection, searchNameTerm} = paginationQueries(req.query)
    const blogId:string = req.params.id
    const blog = await blogsRepository.findBlog(blogId)
    if(!blog){
        res.sendStatus(HttpStatus.NotFound)
        return
    }
    const posts = await postsRepository.getPostsForSelectedBlog({
        blogId,
        query:{pageSize,pageNumber,sortDirection,sortBy,searchNameTerm}
    })
    if(!posts){
        res.sendStatus(HttpStatus.NotFound)
        return
    }
    res.sendStatus(HttpStatus.Ok).send(posts)
}