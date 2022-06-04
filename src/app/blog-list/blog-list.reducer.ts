import { Action, createFeatureSelector, createSelector } from "@ngrx/store";
import { BlogPost } from "../blog-post/blog-post.model";
import { BlogPostActions, GET_ALL_BLOG_POSTS, CREATE_NEW_BLOG_POST, DELETE_BLOG_POST } from "./blog-list.actions";
import * as fromRoot from '../app.reducer';

export interface BlogPostState {
    allBlogPosts: BlogPost[];
    newBlogPost: BlogPost;
    deletBlogPostId: string;
};

export interface State extends fromRoot.State {
    blog_post_state: BlogPostState;
}

const initialState: BlogPostState = {
    allBlogPosts: [],
    newBlogPost: { id: '', title: '', content: '', date: new Date(), author: '', status: '' } as BlogPost,
    deletBlogPostId: ''
};

export function blogListReducer(state = initialState, action: BlogPostActions) {
    console.log('action from the reducer', action)
    switch (action.type) {
        case GET_ALL_BLOG_POSTS:
            return {
                ...state,
                allBlogPosts: action.payload
            };
        case CREATE_NEW_BLOG_POST:
            return {
                ...state,
                newBlogPost: action.payload
            };
        case DELETE_BLOG_POST:
            return {
                ...state,
                deleteBlogPostId: action.payload
            };
        default: {
            return state;
        }
    }
}


export const getBlogPostsState = createFeatureSelector<BlogPostState>('blog_post_state');

export const getAllBlogPosts = createSelector(getBlogPostsState, (state: BlogPostState) => state.allBlogPosts);
export const createNewBlogPost = createSelector(getBlogPostsState, (state: BlogPostState) => state.newBlogPost);
export const deleteBlogPostId = createSelector(getBlogPostsState, (state: BlogPostState) => state.deletBlogPostId);