import {Comment} from "../../types";

export interface CommentDao {
    createComment(comment : Comment): Promise<void>;
    listComments(postId : string): Promise<Comment[] | undefined>;
    deleteCommentById(id : string ): Promise<void>;

}