import {Post} from "../types";


export interface ListPostRequest {}


export type CreatePostRequest = Pick<Post, 'title'| 'url'>;


export interface GetPostRequest {}