import {Post, User} from "./types";


// Post APIs
export interface ListPostRequest {}
export interface ListPostResponse {
    posts : Post[];
}

export type CreatePostRequest = Pick<Post, 'title'| 'url'>;
export interface CreatePostResponse {}


export interface GetPostRequest {}
export interface GetPostResponse {
    post : Post
}


// Comment APIs


// Like APIs


// User APIs
export type SignUpRequest = Pick<User, 'email' | 'firstName' | 'lastName' | 'username' | 'password'>;

export interface SignUpResponse {}

export interface SignInRequest {
    email_or_username: string,
    password: string,
}

export type SignInResponse = {
    user: Pick<User, 'email' | 'firstName' | 'lastName' | 'username' | 'id'>
    jwt : string
}
