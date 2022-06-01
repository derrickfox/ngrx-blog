import { Action, createFeatureSelector, createSelector } from "@ngrx/store";
import { BlogPost } from "../blog-post/blog-post.model";
import { BlogPostActions, GET_ALL_BLOG_POSTS } from "./blog-list.actions";
import * as fromRoot from '../app.reducer';

export interface BlogPostState {
    allBlogPosts: BlogPost[];
};

export interface State extends fromRoot.State {
    blog_post_state: BlogPostState;
}

const initialState: BlogPostState = {
    allBlogPosts: []
};

export function blogListReducer(state = initialState, action: BlogPostActions) {
    console.log('action', action)
    switch (action.type) {
        case GET_ALL_BLOG_POSTS:
            console.log('GET_ALL_BLOG_POSTS action -> reducer');
            return {
                ...state,
                allBlogPosts: action.payload
            };
        default: {
            console.log('reducer default case')
            return state;
        }
    }
}


export const getBlogPostsState = createFeatureSelector<BlogPostState>('blog_post_state');

export const getAllBlogPosts = createSelector(getBlogPostsState, (state: BlogPostState) => state.allBlogPosts);