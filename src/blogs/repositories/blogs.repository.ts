import {db} from "../../db/db";
import {InputBlogType} from "../routes/blogs.router";

export const blogsRepository = {
    allBlogs() {
        return db.blogs
    },
    createBlog(blog: InputBlogType) {
        const newBlog = {
            id: new Date().toISOString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl
        }
        db.blogs.push(newBlog)
        return newBlog
    },
    findBlog(id: string) {
        return db.blogs.find(b => b.id === id)
    },
    updateBlog(id: string, blog: InputBlogType) {
        const index = db.blogs.findIndex(b => b.id === id)
        if (index === -1) {
            return false
        }

        const updatedBlog = {
            id: id,
            ...blog
        }

        db.blogs[index] = updatedBlog
        return updatedBlog
    },
    deleteBlog(id: string) {
        const index = db.blogs.findIndex(b => b.id === id)
        if (index == -1) return false
        db.blogs.splice(index, 1)
        return true
    }
}