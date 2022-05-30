import { Action, createFeatureSelector, createSelector } from "@ngrx/store";
import { BlogPost } from "../blog-post/blog-post.model";
import { BlogPostActions, GET_ALL_BLOG_POSTS } from "./blog-list.actions";
import * as fromRoot from '../app.reducer';

export interface BlogPostState {
    allBlogPosts: BlogPost[];
};

export interface State extends fromRoot.State {
    blog_post: BlogPostState;
}

const initialState: BlogPostState = {
    allBlogPosts: []
};

export function blogListReducer(state = initialState, action: BlogPostActions) {
    switch (action.type) {
        case GET_ALL_BLOG_POSTS:
            return {
                ...state,
                allBlogPosts: action.payload
            };
        default: {
            return state;
        }
    }
}


export const getBlogPostsState = createFeatureSelector<BlogPostState>('training');

export const getAllBlogPosts = createSelector(getBlogPostsState, (state: BlogPostState) => state.allBlogPosts);