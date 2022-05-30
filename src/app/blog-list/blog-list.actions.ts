import { Action } from "@ngrx/store";
import { BlogPost } from "../blog-post/blog-post.model";

export const GET_ALL_BLOG_POSTS = '[BlogPost] Get All Blog Posts';

export class GetAllBlogPosts implements Action {
    readonly type = GET_ALL_BLOG_POSTS;

    constructor(public payload: BlogPost[]) {}
}

export type BlogPostActions = GetAllBlogPosts;