import {Datastore} from "../";
import {Comment, Like, Post, User} from "../../types";

export class InMemoryDatastore implements Datastore {



    private users: User[] = [];
    private posts: Post[] = [];
    private likes: Like[] = [];
    private comments: Comment[] = [];

    createComment(comment: Comment): Promise<void> {
        this.comments.push(comment);
        return Promise.resolve();
    }

    createLike(like: Like): Promise<void> {
        this.likes.push(like);
        return Promise.resolve();
    }

    createPost(post: Post): Promise<void> {
        this.posts.push(post);
        return Promise.resolve();
    }

    createUser(user: User): Promise<void> {
        this.users.push(user);
        return Promise.resolve();
    }

    deleteCommentById(id: string): Promise<void> {
        const commentIndex = this.comments.findIndex(c => c.id === id);
        if (commentIndex === -1 ){
            return Promise.resolve();
        }
        this.comments.splice(commentIndex, 1);
        return Promise.resolve();
    }

    deletePostById(id: string): Promise<void> {
        const postIndex = this.posts.findIndex(p => p.id === id);
        if (postIndex === -1 ){
            return Promise.resolve();
        }
        this.posts.splice(postIndex, 1);
        return Promise.resolve();
    }

    getPostById(id: string): Promise<Post | undefined> {
        return Promise.resolve(this.posts.find( p => p.id === id));
    }

    getUserByEmail(email: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find( u => u.email === email));
    }

    getUserById(id: string): Promise<User |undefined> {
        return Promise.resolve(this.users.find( u => u.id === id));
    }

    getUserByUsername(username: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find( u => u.username === username));
    }

    listComments(postId: string): Promise<Comment[] | undefined> {
        return Promise.resolve(this.comments.filter(c => c.postId === postId));
    }

    listPosts(): Promise<Post[] | undefined> {
        return Promise.resolve(this.posts);
    }




}