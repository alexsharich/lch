import {InputBlogType} from "../dto/blogs.input.dto";
import {BlogType} from "../types/blog.types";
import {blogsRepository} from "../repositories/blogs.repository";
import {InputPostForBlogType} from "../../input-output-types/post-types";
import {PostType} from "../../posts/types/post.types";
import {postsRepository} from "../../posts/repositories/posts.repository";

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
    },
    async createPostForSelectedBlog({blogId, body}: {
        blogId: string,
        body: InputPostForBlogType
    }): Promise<string | null> {
        const blogExist = await blogsRepository.findBlog(blogId)
        if (!blogExist) {
            return null
        }
        const newPost: PostType = {
            title: body.title,
            blogId: blogId,
            shortDescription: body.shortDescription,
            content: body.content,
            blogName: blogExist.name,
            createdAt: (new Date().toISOString())
        }
        return await postsRepository.createPost(newPost)
    }
}