import { useCallback, useContext, useEffect } from 'react'
import AxiosContext from '@context/axios/AxiosContext'
import { useStorage } from '@context/global-state/GlobalState'
import { IAxiosResponse } from '@interface/context/axios/Axios'
import { ERROR_COUNTER } from '@constant/variables'
import useSpinnerModel from '@model/spinner/SpinnerModel'
import { ICreateUser, IUpdateUser, IUser, IUserModel, IUserStorage } from '@interface/core/model/user/User'
import showToast from '@components/global/toast/Toast'

const useUsersModel = (): IUserModel => {
  const axios = useContext(AxiosContext)
  const initialState: IUserStorage = {
    state: false,
    list: new Map<number, IUser>(),
    errorCounter: 0
  }
  const { storage, updateStorage } = useStorage<IUserStorage>('user', initialState)
  const { setSpinner } = useSpinnerModel()

  const createUser = useCallback(
    async (data: ICreateUser) => {
      setSpinner(true)
      await axios.post<IAxiosResponse<IUser>>(`user`, data)
        .then(({ data: { result } }) => {
          const list = new Map<number, IUser>(storage.list.entries())
          list.set(result.userId, result)
          updateStorage({ ...storage, list, state: true })
          showToast('success', 'Registro exisotoso.')
        })
        .catch((error) => {
          const response = error.response?.data?.message ? error.response?.data?.message : 'CANT CONNECT TO SERVER'
          showToast('error', response)
        })
        .finally(() => {
          setTimeout(() => setSpinner(false), 2000)
        })
    },
    [axios, setSpinner, storage, updateStorage]
  )

  const readUsers = useCallback(
    async () => {
      setSpinner(true)
      await axios.get<IAxiosResponse<Array<IUser>>>(`/user`)
        .then(({ data: { result } }) => {
          const list = new Map<number, IUser>()
          result.forEach((user) => {
            list.set(user.userId, user)
          })
          updateStorage({ ...storage, list, state: true })
        })
        .catch((error) => {
          const response = error.response?.data?.message ? error.response?.data?.message : 'CANT CONNECT TO SERVER'
          updateStorage({ ...storage, errorCounter: ++storage.errorCounter })
          if (++storage.errorCounter === ERROR_COUNTER) showToast('error', response)
        })
        .finally(() => {
          setTimeout(() => setSpinner(false), 2000)
        })
    },
    [axios, setSpinner, storage, updateStorage]
  )

  const updateUser = useCallback(
    async (userId: number, updateUser: IUpdateUser) => {
      setSpinner(true)
      await axios.put<IAxiosResponse<IUser>>(`/user/${userId}`, updateUser)
        .then(({ data: { result } }) => {
          const list = new Map<number, IUser>(storage.list.entries())
          list.set(result.userId, result)
          updateStorage({ ...storage, list, state: true })
          showToast('success', 'Usuario actualizado con exito.')
        })
        .catch((error) => {
          const response = error.response?.data?.message ? error.response?.data?.message : 'CANT CONNECT TO SERVER'
          showToast('error', response)
        })
        .finally(() => {
          setTimeout(() => setSpinner(false), 2000)
        })
    },
    [axios, setSpinner, storage, updateStorage]
  )

  const updateStateUser = useCallback(
    async (userId: number, userState: number) => {
      setSpinner(true)
      await axios.put<IAxiosResponse<IUser>>(`/user/state/${userId}`, { userState })
        .then(({ data: { result } }) => {
          const list = new Map<number, IUser>(storage.list.entries())
          list.set(result.userId, result)
          updateStorage({ ...storage, list, state: true })
          showToast('success', 'Usuario actualizado con exito.')
        })
        .catch((error) => {
          const response = error.response?.data?.message ? error.response?.data?.message : 'CANT CONNECT TO SERVER'
          showToast('error', response)
        })
        .finally(() => {
          setTimeout(() => setSpinner(false), 2000)
        })
    },
    [axios, setSpinner, storage, updateStorage]
  )

  const deleteUser = useCallback(
    async (userId: number) => {
      setSpinner(true)
      await axios.delete<IAxiosResponse<number>>(`/post/${userId}`)
        .then(({ data: { result } }) => {
          const list = new Map<number, IUser>(storage.list.entries())
          list.delete(result)
          updateStorage({ ...storage, list, state: true })
          showToast('success', 'Usuario eliminado con exito.')
        })
        .catch((error) => {
          const response = error.response?.data?.message ? error.response?.data?.message : 'CANT CONNECT TO SERVER'
          showToast('error', response)
        })
        .finally(() => {
          setTimeout(() => setSpinner(false), 2000)
        })
    },
    [axios, setSpinner, storage, updateStorage]
  )

  useEffect(() => {
    if (!storage.state && storage.errorCounter < ERROR_COUNTER)readUsers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storage.errorCounter, storage.state])

  return {
    usersStorage: storage,
    createUser,
    readUsers,
    updateUser,
    updateStateUser,
    deleteUser
  }
}

export default useUsersModel
