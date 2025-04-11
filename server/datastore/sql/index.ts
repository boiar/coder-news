import {Database, open as sqliteOpen} from "sqlite";
import sqlite3 from "sqlite3";
import {Datastore} from "../DatabaseConnection";
import {Comment, Like, Post, User} from "../../types";
import * as path from "path";

export class SqlDataStore implements Datastore {

    private db!: Database<sqlite3.Database, sqlite3.Statement>;
    public async openDb(){
        // open the database file
        this.db = await sqliteOpen({
            filename: path.join(__dirname, 'coder_news.sqlite'),
            driver: sqlite3.Database
        });

        this.db.run('PRAGMA foreign_keys = ON;');

        await this.db.migrate({
            migrationsPath: path.join(__dirname, 'migrations')
        })
        return this;
    }


    // function data operations
    createComment(comment: Comment): Promise<void> {
        return Promise.resolve(undefined);
    }

    createLike(like: Like): Promise<void> {
        return Promise.resolve(undefined);
    }

    async createPost(post: Post): Promise<void> {
        await this.db.run(
            'INSERT INTO posts (id, user_id, title, url, posted_at) VALUES (?, ?, ?, ?, ?)',
            post.id,
            post.userId,
            post.title,
            post.url,
            post.postedAt
        );
    }

    async createUser(user: User): Promise<void> {
        await this.db.run(
            `INSERT INTO users (id, first_name, last_name, user_name, email, password) VALUES (?, ?, ?, ?, ?, ?)`,
            [
                user.id,
                user.firstName,
                user.lastName,
                user.username,
                user.email,
                user.password
            ]
        );
    }


    deleteCommentById(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    deletePostById(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    getPostById(id: string): Promise<Post | undefined> {
        return Promise.resolve(undefined);
    }

    getUserByEmail(email: string): Promise<User | undefined> {
        return this.db.get<User>(`SELECT * FROM users WHERE email = ?`, email);
    }

    getUserByUsername(username: string): Promise<User | undefined> {
        return this.db.get<User>(`SELECT * FROM users WHERE user_name = ?`, username);
    }

    getUserById(id: string): Promise<User | undefined> {
        return this.db.get<User>(`SELECT * FROM users WHERE id = ?`, id);
    }


    listComments(postId: string): Promise<Comment[] | undefined> {
        return Promise.resolve(undefined);
    }

    listPosts(): Promise<Post[] | undefined> {
        return this.db.all<Post[]>('SELECT * FROM posts');
    }


}