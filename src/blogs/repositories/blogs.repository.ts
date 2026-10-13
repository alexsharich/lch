import {db} from "../../db/db";
import {InputBlogType} from "../dto/blogs.input.dto";

export const blogsRepository = {
   async allBlogs() {
        return db.blogs
    },
    async createBlog(blog: InputBlogType) {
        const newBlog = {
            id: new Date().toISOString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl
        }
        db.blogs.push(newBlog)
        return newBlog
    },
    async findBlog(id: string) {
        return db.blogs.find(b => b.id === id)
    },
    async updateBlog(id: string, blog: InputBlogType) {
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
    async deleteBlog(id: string) {
        const index = db.blogs.findIndex(b => b.id === id)
        if (index == -1) return false
        db.blogs.splice(index, 1)
        return true
    }
}