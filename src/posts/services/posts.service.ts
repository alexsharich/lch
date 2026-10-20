import {PostDBType, PostType} from "../types/post.types";
import {postsRepository} from "../repositories/posts.repository";
import {InputPostType} from "../dto/posts.input.dto";
import {blogsRepository} from "../../blogs/repositories/blogs.repository";

export const postsService = {
    async createPost(body: InputPostType): Promise<string | null> {
        const existBlog = await blogsRepository.findBlog(body.blogId)
        if (existBlog) {
            const newPost: PostType = {
                title: body.title,
                shortDescription: body.shortDescription,
                content: body.content,
                blogId: body.blogId,
                blogName: existBlog.name,
                createdAt: (new Date().toISOString())
            }
            return await postsRepository.createPost(newPost)
        } else {
            return null
        }
    },
    async deletePost(id: string): Promise<boolean> {
        return await postsRepository.deletePost(id)
    },
    async updatePost({params, body}: { params: string, body: InputPostType }): Promise<boolean | null> {
        return await postsRepository.updatePost({params, body})
    },
    async findPost(id: string): Promise<PostDBType | null> {
        return postsRepository.findPost(id)
    }
}