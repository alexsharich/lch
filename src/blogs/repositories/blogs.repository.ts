import {blogsCollection} from "../../db/collections";
import {BlogDBType, BlogType} from "../types/blog.types";
import {ObjectId, WithId} from "mongodb";
import {OutputBlogType} from "../../input-output-types/blog-types";
import {InputBlogType} from "../dto/blogs.input.dto";

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
   async allBlogs() {
       return blogsCollection.find({}).toArray()
    },
    async createBlog(blog: InputBlogType) {
        const newBlog: BlogType = {
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            isMembership: false,
            createdAt: (new Date().toISOString())
        }

        try {
            const createdBlog = await blogsCollection.insertOne(newBlog)
            console.log('CREATE',createdBlog)
            return createdBlog.insertedId.toHexString()
        } catch (e){
            console.log('Create blog error : ',e)
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
    async updateBlog({params,body}:any) {
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