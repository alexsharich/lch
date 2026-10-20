import { Collection, Db } from 'mongodb';
import {PostType} from "../posts/types/post.types";
import {BlogType} from "../blogs/types/blog.types";
import {UserType} from "../users/types/user.types";


export const BLOGS_COLLECTION_NAME = 'blogs';
export const POSTS_COLLECTION_NAME = 'posts';
export const USERS_COLLECTION_NAME = 'users'


export let blogsCollection: Collection<BlogType>;
export let postsCollection: Collection<PostType>;
export let usersCollection:Collection<UserType>


export function initCollections(db: Db): void {
    blogsCollection = db.collection<BlogType>(BLOGS_COLLECTION_NAME);
    postsCollection = db.collection<PostType>(POSTS_COLLECTION_NAME);
    usersCollection = db.collection<UserType>(USERS_COLLECTION_NAME)
}

export function getAllCollections(): Collection<any>[] {
    return [blogsCollection, postsCollection,usersCollection];
}