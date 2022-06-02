import { Action } from "@ngrx/store";
import { BlogPost } from "../blog-post/blog-post.model";

export const GET_ALL_BLOG_POSTS = '[BlogPost] Get All Blog Posts';
export const CREATE_NEW_BLOG_POST = '[BlogPost] Create New Blog Post';

export class GetAllBlogPosts implements Action {
    readonly type = GET_ALL_BLOG_POSTS;
    constructor(public payload: BlogPost[]) {}
}

export class CreateNewBlogPost implements Action {
    readonly type = CREATE_NEW_BLOG_POST;
    constructor(public payload: BlogPost) {}
}

export type BlogPostActions = GetAllBlogPosts | CreateNewBlogPost;