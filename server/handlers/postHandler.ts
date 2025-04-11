import {db} from "../datastore/DatabaseConnection";
import crypto from "crypto";
import {CreatePostRequest, CreatePostResponse, ListPostRequest, ListPostResponse} from "../api";
import { Post, ExpressHandler } from "../types";


export const listPostsHandler : ExpressHandler<ListPostRequest, ListPostResponse> = async (req, res)=>{
    console.log(req.headers.authorization)
    res.send({
        posts : await db.listPosts()
    });
};




export const createPostHandler : ExpressHandler<CreatePostRequest, CreatePostResponse> = async (req, res) => {
    try {

        if(!req.body.title  || !req.body.url) {
            return res.status(400).json({ message: 'Bad request: missing required fields' });
        }


        const post: Post = {
            id : crypto.randomUUID(),
            postedAt : Date.now(),
            title : req.body.title,
            url : req.body.url,
            userId : res.locals.userId,
        }
        await db.createPost(post);

        return res.status(200).json({ message: 'Post Created Successfully!' });

    } catch (error) {

        if (error.code === 'SQLITE_CONSTRAINT' && error.message.includes('posts.url')) {
            return res.status(409).send({ error: 'A post with this URL already exists.' });
        }

        console.error('Error while adding post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}