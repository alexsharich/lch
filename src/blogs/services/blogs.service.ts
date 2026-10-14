import {InputBlogType} from "../dto/blogs.input.dto";
import {BlogType} from "../types/blog.types";
import {blogsRepository} from "../repositories/blogs.repository";

export const blogsService = {
    async createBlog(body: InputBlogType): Promise<string | null> {
        const newBlog: BlogType = {
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            isMembership: false,
            createdAt: (new Date().toISOString())
        }
        return await blogsRepository.createBlog(newBlog)
    },
    async deleteBlog(blogId: string): Promise<boolean> {
        return await blogsRepository.deleteBlog(blogId)
    },
    async updateBlog({params, body}: { params: string, body: InputBlogType }): Promise<boolean | null> {
        return await blogsRepository.updateBlog({params, body})
    }
}