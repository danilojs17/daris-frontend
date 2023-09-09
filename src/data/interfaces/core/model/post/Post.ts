export interface IPost {
  postId: string;
  postDescription?: string;
  postPhoto: string;
  postState: number;
  postCreatedAt: Date;
  postUpdatedAt?: Date;
}

export type ICreatePost = Omit<IPost, 'userId' | 'postState' | 'postCreatedAt' | 'postUpdatedAt'>

export interface IUpdatePost extends Partial<ICreatePost>{
  newPassword?: string;
  postState?: number;
}

export type IPostStorage = {
  state: boolean;
  list: Map<string, IPost>;
  errorCounter: number;
}

export interface IPostModel {
  postStorage: IPostStorage;
  createPost: (user: ICreatePost) => Promise<void>;
  readPost: () => Promise<void>;
  updatePost: (post: string, postUpdate: IUpdatePost) => Promise<void>;
  updateStatePost: (post: string, postState: number) => Promise<void>;
  deletePost: (post: string) => Promise<void>;
}
