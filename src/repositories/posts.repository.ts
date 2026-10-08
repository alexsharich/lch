import {InputPostType} from "../posts/routes/posts.router";
import {db} from "../db/db";

export const postsRepository = {
    allPosts() {
        return db.posts
    },
    createPost(blogId: string, blogName: string, post: InputPostType) {
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
    findPost(id: string) {
        return db.posts.find(p => p.id === id)
    },
    updatePost(blogName: string, id: string, post: InputPostType) {
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
    deletePost(id: string) {
        const index = db.posts.findIndex(p => p.id === id)
        if (index == -1) return false
        db.posts.splice(index, 1)
        return true
    }
    }