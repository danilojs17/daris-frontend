import { IAction, IAuthContext } from '@interface/context/auth/Auth'

const authReducer = (state: IAuthContext, action: IAction): IAuthContext => {
  const { type, payload } = action

  if (type === 'LOADING') {
    return {
      ...state,
      loading: payload as boolean
    }
  } else if (type === 'LOGIN') {
    return {
      ...state,
      logged: true,
      loading: false,
      user: {
        data: payload
      }

    }
  } else if (type === 'LOGOUT' || type === 'RESET_LOGIN') {
    return {
      ...payload
    }
  }

  return state
}

export default authReducer
