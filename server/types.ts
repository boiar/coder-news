import {RequestHandler} from "express";

export interface User {
    id : string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

export interface Post {
    id : string;
    title : string;
    url : string;
    userId : string;
    postedAt : number;
}

export interface Like {
    id : string;
    postId : string;
}

export interface Comment {
    id :string;
    userId :string;
    postId : string;
    comment : string;
    postedAt : number
}

// TODO Mets here we add param error
type WithError<T> = T & {error: string};

// we define custom request handler

export type ExpressHandler<Req, Res> = RequestHandler <
    string,
    Partial<Res>,
    Partial<WithError<Req>>, // here we add error in response
    any
>


// TODO Mets what meaning of interface ?
export interface JwtObject {
    userId: string
}