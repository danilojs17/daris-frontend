export interface IUser {
  userId: number;
  userFullName: string;
  userLastName: string;
  username: string;
  userEmail: string;
  userPassword: string;
  userState: number;
  userCreatedAt: Date;
  userUpdatedAt?: Date;
}

export type ICreateUser = Omit<IUser, 'userId' | 'userState' | 'userCreatedAt' | 'userUpdatedAt' | 'roleUser'>

export interface IUpdateUser extends Partial<ICreateUser>{
  newPassword?: string;
  userState?: number;
}

export type IUserStorage = {
  state: boolean;
  list: Map<number, IUser>;
  errorCounter: number;
}

export interface IUserModel {
  usersStorage: IUserStorage;
  createUser: (user: ICreateUser) => Promise<void>;
  readUsers: () => Promise<void>;
  updateUser: (userId: number, userUpdate: IUpdateUser) => Promise<void>;
  updateStateUser: (userId: number, userState: number) => Promise<void>;
  deleteUser: (userId: number) => Promise<void>;
}
