import { ReactNode } from 'react'
import { IDataUser } from './User'

export interface IUserAuthenticated {
  data: IDataUser;
}

export interface ITokenDecode extends IDataUser {
}

export interface IAuthPayload {
  username: string;
  password: string;
  remember?: boolean;
}

export type IRecoverPassword = Pick<IDataUser, 'username' | 'userEmail'>

export type IChangePassword = Pick<IDataUser, 'username' | 'userId'> & {
  userPassword: string;
  token: string;
}

export interface IAuthContext{
  loading: boolean;
  logged: boolean;
  user: IUserAuthenticated;
  login : (loginData: IAuthPayload) => Promise<void>;
  logout : () => void;
  requestPassword: (recoverData: IRecoverPassword) => Promise<void>;
  changePassword: (newPassword: IChangePassword) => Promise<void>
}

export interface IAuthState {
  children: ReactNode;
}

export type IAction =
  { payload: ITokenDecode; type: 'LOGIN' }
| { payload: boolean; type: 'LOADING' }
| { payload: IAuthContext; type: 'LOGOUT' | 'RESET_LOGIN'}

export interface IAuthLoginResult {
  token: string
}
