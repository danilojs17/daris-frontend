import { IPost } from "../post/Post";
import { IUser } from "../user/User";

export interface IComment {
  commentId: string;
  commentDescription?: string;
  commentPhoto?: string;
  commentState: number;
  commentCreatedAt: string;
  commentUpdatedAt: string;
  user: IUser;
  post: IPost;
}

export interface ICreateComment
  extends Pick<IComment, 'commentDescription' | 'commentPhoto'> {
  postId: string;
  userId: number;
}

export interface IUpdateComment
  extends Pick<ICreateComment, 'commentDescription' | 'commentPhoto'> {
  commentState?: number;
}

export type ICommentStorage = {
  state: boolean;
  list: Map<string, IComment>;
  errorCounter: number;
}

export interface ICommentModel {
  commentStorage: ICommentStorage;
  createComment: (comment: ICreateComment) => Promise<void>;
  readComment: () => Promise<void>;
  updateComment: (comment: string, commentUpdate: IUpdateComment) => Promise<void>;
  deleteComment: (comment: string) => Promise<void>;
}
