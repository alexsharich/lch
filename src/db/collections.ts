import { Collection, Db } from 'mongodb';
import {PostType} from "../posts/types/post.types";
import {BlogType} from "../blogs/types/blog.types";


export const BLOG_COLLECTION_NAME = 'blogs';
export const POST_COLLECTION_NAME = 'posts';


export let blogCollection: Collection<BlogType>;
export let postCollection: Collection<PostType>;


export function initCollections(db: Db): void {
    blogCollection = db.collection<BlogType>(BLOG_COLLECTION_NAME);
    postCollection = db.collection<PostType>(POST_COLLECTION_NAME);
}

export function getAllCollections(): Collection<any>[] {
    return [blogCollection, postCollection];
}