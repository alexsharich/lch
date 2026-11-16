import {PostDBType} from "../posts/types/post.types";
import {BlogDBType} from "../blogs/types/blog.types";
import {UserDBType} from "../users/types/user.types";
import {MongoClient} from "mongodb";
import dotenv from 'dotenv'

dotenv.config()

const mongoUri = process.env.MONGO_URL
if (!mongoUri) {
    throw new Error('INVALID MONGO URL')
}
const client = new MongoClient(mongoUri)
const DB = client.db('social')
export const postsCollection = DB.collection<PostDBType>('posts')
export const blogsCollection = DB.collection<BlogDBType>('blogs')

export const usersCollection = DB.collection<UserDBType>('users')

export async function runDb() {
    try {
        await client.connect()
        await client.db('social').command({ping: 1})
        console.log('Connected successfully to mongo server')
    } catch {
        await client.close()
    }
}