import {UserDao} from "./dao/UserDao";
import {PostDao} from "./dao/PostDao";
import {LikeDao} from "./dao/LikeDao";
import {CommentDao} from "./dao/CommentDao";
import {InMemoryDatastore} from "./memorydb";
import {SqlDataStore} from "./sql";

export interface Datastore extends UserDao, PostDao, LikeDao, CommentDao {}


export let db: Datastore;

export async function initDb() {
  db = await new SqlDataStore().openDb();
}


