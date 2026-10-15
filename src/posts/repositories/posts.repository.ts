import {InputPostType} from "../dto/posts.input.dto";
import {blogsCollection, postsCollection} from "../../db/collections";
import {PostDBType, PostType} from "../types/post.types";
import {blogsRepository, SortMongoType} from "../../blogs/repositories/blogs.repository";
import {ObjectId, WithId} from "mongodb";
import {OutputPostType} from "../../input-output-types/post-types";
import {PaginationQueriesType} from "../../helpers/pagination-values";

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
    async allPosts(query: PaginationQueriesType) {
        try {
            const pageNumber = query.pageNumber
            const pageSize = query.pageSize
            const sortBy = query.sortBy
            const sortDirection = query.sortDirection === 'asc' ? 1 : -1
            const searchNameTerm = query.searchNameTerm
            let filter = {}
            if (searchNameTerm) {
                filter = {$regex: searchNameTerm, $option: 'i'}
            }
            const sortFilter: SortMongoType = {[sortBy]: sortDirection} as SortMongoType
            const posts = await postsCollection
                .find(filter)
                .sort(sortFilter)
                .skip((pageNumber - 1) * pageSize)
                .limit(+pageSize)
                .toArray()

            const totalCount = await blogsCollection.countDocuments(filter)


            return {
                pagesCount: Math.ceil(totalCount / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount: totalCount,
                items: posts.map((post: WithId<PostDBType>)=>mapToOutputPost(post))
            }
        } catch (e) {

            console.log('Get posts for selected blog Error')
            return null
        }
    },
    async createPost(body: InputPostType): Promise<string | null> {
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
    async updatePost({params, body}: { params: string, body: InputPostType }): Promise<any> {
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
            if (result.matchedCount === 1) return true
        } catch (e) {
            return null
        }
    },
    async deletePost(id: string): Promise<boolean> {
        try {
            const postId = new ObjectId(id)
            const result = await postsCollection.deleteOne({_id: postId})
            if (result.deletedCount === 1) return true
            return false
        } catch (e) {
            return false
        }
    },
    async getPostsForSelectedBlog({blogId, query}: { blogId: string, query: PaginationQueriesType }){
        try {
            const pageNumber = query.pageNumber
            const pageSize = query.pageSize
            const sortBy = query.sortBy
            const sortDirection = query.sortDirection === 'asc' ? 1 : -1

            let filter = {blogId: blogId}

            const sortFilter: SortMongoType = {[sortBy]: sortDirection} as SortMongoType
            const posts= await postsCollection
                .find(filter).sort(sortFilter)
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .toArray()

            const totalCount = await postsCollection.countDocuments(filter)

            return {
                pagesCount: Math.ceil(totalCount / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount: totalCount,
                items: posts.map((post: WithId<PostDBType>)=>mapToOutputPost(post))
            }

        } catch (e) {
            console.log('Get posts for selected blog Error')
            return null
        }
    }
}