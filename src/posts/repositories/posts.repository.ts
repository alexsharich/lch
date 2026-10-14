import {InputPostType} from "../dto/posts.input.dto";
import {postsCollection} from "../../db/collections";
import {PostDBType, PostType} from "../types/post.types";
import {blogsRepository} from "../../blogs/repositories/blogs.repository";
import {ObjectId, WithId} from "mongodb";
import {OutputPostType} from "../../input-output-types/post-types";

export const mapToOutputPost = (post: WithId<PostDBType>): OutputPostType => {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        createdAt: post.createdAt,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName
    }
}

export const postsRepository = {
    async allPosts() {
        return postsCollection.find({}).toArray()
    },
    async createPost(body: InputPostType) {
        const existBlog = await blogsRepository.findBlog(body.blogId)
        if (!existBlog) {
            return null
        }
        const newPost: PostType = {
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,
            blogName: existBlog.name,
            createdAt: (new Date().toISOString())
        }

        try {
            const createdPost = await postsCollection.insertOne(newPost)
            return createdPost.insertedId.toHexString()
        } catch (e) {
            console.log('Create post repo  erro', e)
            return null
        }

    },
    async findPost(id: string) {
        try {
            const postId = new ObjectId(id)
            const post = await postsCollection.findOne({_id: postId})
            if (post) return mapToOutputPost(post)
            return null
        } catch (e) {
            return null
        }
    },
    async updatePost({params, body}: any) {
        try {
            const postId = new ObjectId(params)
            const result = await postsCollection.updateOne({_id: postId}, {
                $set: {
                    title: body.title,
                    content: body.content,
                    shortDescription: body.shortDescription,
                    blogId: body.blogId
                }
            })
            if (result.matchedCount === 1) return await postsCollection.findOne({_id: postId})
            return null
        } catch (e) {
            return null
        }
    },
    async deletePost(id: string) {
        try {
            const postId = new ObjectId(id)
            const result = await postsCollection.deleteOne({_id: postId})
            if (result.deletedCount === 1) return true
            return false
        } catch (e) {
            return false
        }
    }
}