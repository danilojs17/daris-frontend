import { IAuthContext, IAuthPayload, IChangePassword, IRecoverPassword } from '@interface/context/auth/Auth'
import { Context, createContext } from 'react'

export const initialState: IAuthContext = {
  logged: false,
  loading: true,
  user: {
    data: {
      userEmail: '',
      userFullName: '',
      userId: 0,
      userLastName: '',
      username: '',
      roleUser: ''
    }
  },
  login: async (loginData: IAuthPayload) => {},
  logout: () => {},
  requestPassword: async (recoverData: IRecoverPassword) => {},
  changePassword: async (newPassword: IChangePassword) => {}
}

export const AuthContext: Context<IAuthContext> = createContext<IAuthContext>(initialState)
