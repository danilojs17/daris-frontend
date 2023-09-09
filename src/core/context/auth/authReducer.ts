import { IAction, IAuthContext } from '@interface/core/auth/Auth'

const authReducer = (state: IAuthContext, action: IAction): IAuthContext => {
  const { type, payload } = action

  if (type === 'LOADING') {
    return {
      ...state,
      loading: payload as boolean
    }
  } else if (type === 'LOGIN') {
    const { permissions, ...data } = payload

    return {
      ...state,
      logged: true,
      loading: false,
      user: {
        permissions,
        data
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
