import {db} from "../../db/db";
import {InputPostType} from "../dto/posts.input.dto";

export const postsRepository = {
    async allPosts() {
        return db.posts
    },
    async createPost(blogId: string, blogName: string, post: InputPostType) {
        const newPost = {
            id: new Date().toISOString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: blogId,
            blogName: blogName
        }
        db.posts.push(newPost)
        return newPost
    },
    async findPost(id: string) {
        return db.posts.find(p => p.id === id)
    },
    async updatePost(blogName: string, id: string, post: InputPostType) {
        const index = db.posts.findIndex(p => p.id === id)
        if (index === -1) {
            return false
        }

        const updatedPost = {
            id: id,
            blogName,
            ...post
        }

        db.posts[index] = updatedPost
        return updatedPost
    },
    async deletePost(id: string) {
        const index = db.posts.findIndex(p => p.id === id)
        if (index == -1) return false
        db.posts.splice(index, 1)
        return true
    }
}