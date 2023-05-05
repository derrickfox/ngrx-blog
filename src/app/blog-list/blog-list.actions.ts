import { Action, createAction, props } from "@ngrx/store";
import { BlogPost } from "../blog-post/blog-post.model";

export const GET_ALL_BLOG_POSTS = '[BlogPost] Get All Blog Posts';
export const CREATE_NEW_BLOG_POST = '[BlogPost] Create New Blog Post';
export const DELETE_BLOG_POST = '[BlogPost] Delete Blog Post';
export const VIEW_BLOG_POST = '[BlogPost] View Blog Post';
export const UPDATE_BLOG_POST = '[BlogPost] Update Blog Post';


  export const searchBlogPosts = createAction(
    '[Blog] Search Blog Posts',
    props<{ searchTerm: string }>()
  );
  
  export const searchBlogPostsSuccess = createAction(
    '[Blog] Search Blog Posts Success',
    props<{ searchResults: BlogPost[] }>()
  );
  
  export const searchBlogPostsFailure = createAction(
    '[Blog] Search Blog Posts Failure',
    props<{ error: any }>()
  );
  
  export const getAllBlogPostsSuccess = createAction(
    '[Blog] Get All Blog Posts Failure',
    props<{ blogPosts: BlogPost[] }>()
  );
  
  export const getAllBlogPostsFailure = createAction(
    '[Blog] Get All Blog Posts Failure',
    props<{ error: any }>()
  );

export class GetAllBlogPosts implements Action {
    readonly type = GET_ALL_BLOG_POSTS;
    constructor(public payload: BlogPost[]) {}
}

export class CreateNewBlogPost implements Action {
    readonly type = CREATE_NEW_BLOG_POST;
    constructor(public payload: BlogPost) {}
}

export class DeleteBlogPost implements Action {
    readonly type = DELETE_BLOG_POST;
    constructor(public payload: string) {}
}

export class ViewBlogPost implements Action {
    readonly type = VIEW_BLOG_POST;
    constructor(public payload: BlogPost) {}
}

export class UpdateBlogPost implements Action {
    readonly type = UPDATE_BLOG_POST;
    constructor(public payload: BlogPost) {}
}

export type BlogPostActions = GetAllBlogPosts | CreateNewBlogPost | DeleteBlogPost | ViewBlogPost | UpdateBlogPost;