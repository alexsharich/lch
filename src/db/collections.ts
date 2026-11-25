import {Collection, Db} from 'mongodb';
import {PostType} from "../posts/types/post.types";
import {BlogType} from "../blogs/types/blog.types";
import {UserType} from "../users/types/user.types";
import {CommentType} from "../comments/types/comments.type";
import {BlackListType} from "./black_list_db_type";
import {Device} from "../devices/types/deviceDBType";


export const BLOGS_COLLECTION_NAME = 'blogs';
export const POSTS_COLLECTION_NAME = 'posts';
export const USERS_COLLECTION_NAME = 'users'
export const COMMENTS_COLLECTION_NAME = 'comments'
export const BLACKLIST_COLLECTION_NAME = 'blackList'
export const DEVICES_COLLECTION_NAME = 'devices'


export let blogsCollection: Collection<BlogType>;
export let postsCollection: Collection<PostType>;
export let usersCollection: Collection<UserType>
export let commentsCollection: Collection<CommentType>
export let blackListCollection: Collection<BlackListType>
export let devicesCollection: Collection<Device>


export function initCollections(db: Db): void {
    blogsCollection = db.collection<BlogType>(BLOGS_COLLECTION_NAME);
    postsCollection = db.collection<PostType>(POSTS_COLLECTION_NAME);
    usersCollection = db.collection<UserType>(USERS_COLLECTION_NAME)
    commentsCollection = db.collection<CommentType>(COMMENTS_COLLECTION_NAME)
    blackListCollection = db.collection<BlackListType>(BLACKLIST_COLLECTION_NAME)
    devicesCollection = db.collection<Device>(DEVICES_COLLECTION_NAME)
}

export function getAllCollections(): Collection<any>[] {
    return [blogsCollection, postsCollection, usersCollection, blackListCollection];
}