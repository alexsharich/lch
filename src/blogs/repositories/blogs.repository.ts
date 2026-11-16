import {BlogDBType, BlogType} from "../types/blog.types";
import {ObjectId, WithId} from "mongodb";
import {OutputBlogType} from "../../input-output-types/blog-types";
import {InputBlogType} from "../dto/blogs.input.dto";
import {PaginationQueriesType} from "../../helpers/pagination-values";
import {blogsCollection} from "../../db/mongo.db";

export type SortMongoType = {
    [key: string]: 1 | -1
}

export const mapToOutputBlog = (blog: WithId<BlogDBType>): OutputBlogType => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership,
    }
}

export const blogsRepository = {
    async allBlogs(query: PaginationQueriesType) {
        try {
            const pageNumber = query.pageNumber
            const pageSize = query.pageSize
            const sortBy = query.sortBy
            const sortDirection = query.sortDirection === 'asc' ? 1 : -1
            const searchNameTerm = query.searchNameTerm
            let filter = {}
            if (searchNameTerm) {
                filter = {name: {$regex: searchNameTerm, $options: 'i'}}
            }

            const sortFilter: SortMongoType = {[sortBy]: sortDirection} as SortMongoType

            const blogs = await blogsCollection.find(filter)
                .sort(sortFilter)
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .toArray()
            const totalCount = await blogsCollection.countDocuments(filter)
            return {
                pagesCount: Math.ceil(totalCount / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount: totalCount,
                items: blogs.map((blog: WithId<BlogDBType>) => mapToOutputBlog(blog))
            }
        } catch (e) {
            console.log('blogs query repo / get blogs : ', e)
            throw new Error('Blogs not found')
        }
    },
    async createBlog(newBlog: BlogType) {
        try {
            const createdBlog = await blogsCollection.insertOne(newBlog)
            console.log('CREATE', createdBlog)
            return createdBlog.insertedId.toHexString()
        } catch (e) {
            console.log('Create blog error : ', e)
            return null
        }
    },
    async findBlog(id: string) {
        try {
            const blogId = new ObjectId(id)
            const blog = await blogsCollection.findOne({_id: blogId})
            if (blog) return mapToOutputBlog(blog)
            return null
        } catch (e) {
            console.log('Blog repository, find blog / find blog ', e)
            return null
        }
    },
    async updateBlog({params, body}: { params: string, body: InputBlogType }) {
        try {
            const blogId = new ObjectId(params)

            const result = await blogsCollection.updateOne({_id: blogId}, {
                $set: {
                    name: body.name,
                    description: body.description,
                    websiteUrl: body.websiteUrl
                }
            })

            if (result.matchedCount === 1) return true
            return null

        } catch (e) {
            return null
        }
    },
    async deleteBlog(id: string) {
        try {
            const blogId = new ObjectId(id)
            const result = await blogsCollection.deleteOne({_id: blogId})
            if (result.deletedCount === 1) return true
            return false
        } catch (e) {
            return false
        }
    }
}