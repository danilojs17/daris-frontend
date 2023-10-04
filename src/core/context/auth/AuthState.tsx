import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Axios, { AxiosInstance } from 'axios'
import { AuthContext, initialState } from './AuthContext'
import jwtDecode from 'jwt-decode'
import authReducer from './authReducer'
import { IAxiosResponse } from '@interface/context/axios/Axios'
import { deleteItem, readItem, storageItem } from '@tools/local-storage/localStorage'
import Spinner from '@components/global/spinner/Spinner'
import { IAuthContext, IAuthLoginResult, IAuthPayload, IAuthState, IChangePassword, IRecoverPassword, ITokenDecode } from '@interface/context/auth/Auth'

export const AuthState: NextPage<IAuthState> = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const axios: AxiosInstance = Axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL })

  const router = useRouter()

  const login = async (loginData: IAuthPayload) => {
    dispatch({ type: 'LOGOUT', payload: { ...initialState, loading: true } })
    await axios.post<IAxiosResponse<IAuthLoginResult>>('/auth', loginData)
      .then(({ data: { result } }) => {
        storageItem('token', result.token)
        dispatch({ type: 'LOGIN', payload: jwtDecode<ITokenDecode>(result.token) })
      }).catch((error) => {
        const response = error.response?.data?.message ? error.response?.data?.message : 'CANT CONNECT TO SERVER'
        console.log('error', response)
      })
      .finally(() => {
        dispatch({ type: 'LOADING', payload: false })
      })
  }

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT', payload: initialState })
    router.push('/')
    deleteItem('token')
    setTimeout(() => {
      dispatch({ type: 'LOGOUT', payload: { ...initialState, loading: false } })
    }, 500)
  }, [router])

  const requestPassword = useCallback(
    async (recoverData: IRecoverPassword) => {
      await axios.post<IAxiosResponse<string>>('auth/request/password', recoverData)
        .then(({ data: { result } }) => {
          console.log('info', result)
        })
        .catch((error) => {
          const response = error.response?.data?.message ? error.response?.data?.message : 'CANT CONNECT TO SERVER'
          console.log('error', response)
        })
    }, [axios]
  )

  const changePassword = useCallback(
    async ({ token, ...newPassword }: IChangePassword) => {
      await axios.post<IAxiosResponse<string>>('auth/change/password', newPassword, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(({ data: { result } }) => {
          // console.log('success', result)
          router.push('//')
        })
        .catch((error) => {
          const response = error.response?.data?.message ? error.response?.data?.message : 'CANT CONNECT TO SERVER'
          console.log('error', response)
        })
    }, [axios, router]
  )

  const value: IAuthContext = {
    loading: state.loading,
    logged: state.logged,
    user: state.user,
    login,
    logout,
    requestPassword,
    changePassword
  }

  const passthrough = useMemo(() => {
    const routesPublic = ['404']

    if (!state.logged && routesPublic.includes(router.pathname)) return true
    if (!state.logged && !routesPublic.includes(router.pathname)) return false
    if (state.logged && router.pathname === '/login') {
      router.push('//')
      window.location.href = '/'
      return true
    }

    return true
  }, [router, state.logged])

  const refreshToken = useCallback(
    () => {
      const token = readItem('token', false)
      if (!token) {
        dispatch({ type: 'RESET_LOGIN', payload: initialState })
        return
      }

      const tokenDecoded = jwtDecode<ITokenDecode>(token as string)
      const currentTime = new Date().getTime()
      const expirationTime = new Date(0).setUTCSeconds(tokenDecoded.exp as number)

      if (currentTime > expirationTime) {
        logout()
        dispatch({ type: 'RESET_LOGIN', payload: initialState })
        return
      }
      dispatch({ type: 'LOGIN', payload: tokenDecoded })
    }, [logout]
  )

  useEffect(() => {
    refreshToken()

    setTimeout(() => {
      dispatch({ type: 'LOADING', payload: false })
    }, 2000)
  }, [refreshToken])

  return (
    <AuthContext.Provider value={value}>
      {<>
        { state.loading
          ? <Spinner />
          : null
        }
        {props.children}
        {/* {!passthrough ? props.children : <JoinPage />} */}
      </>
      }
    </AuthContext.Provider>
  )
}

export default AuthState
