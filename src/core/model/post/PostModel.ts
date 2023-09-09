import { toast } from 'react-hot-toast';
import { useCallback, useContext, useEffect } from 'react'
import AxiosContext from '@context/axios/AxiosContext'
import { useStorage } from '@context/global-state/GlobalState'
import { IAxiosResponse } from '@interface/context/axios/Axios'
import { ERROR_COUNTER } from '@constant/variables'
import useSpinnerModel from '@model/spinner/SpinnerModel'
import { ICreatePost, IPost, IPostModel, IPostStorage, IUpdatePost } from '@interface/core/model/post/Post';

const usePostModel = (): IPostModel => {
  const axios = useContext(AxiosContext)
  const initialState: IPostStorage = {
    state: false,
    list: new Map(),
    errorCounter: 0
  }
  const { storage, updateStorage } = useStorage<IPostStorage>('post', initialState)
  const { setSpinner } = useSpinnerModel()

  const createPost = useCallback(
    async (post: ICreatePost) => {
      setSpinner(true)
      await axios.post<IAxiosResponse<IPost>>(`/post`, post)
        .then(({ data: { result } }) => {
          const list = new Map<string, IPost>(storage.list.entries())
          list.set(result.userId, result)
          updateStorage({ ...storage, list, state: true })
          toast('Registro exisotoso.')
        })
        .catch((error) => {
          const response = error.response?.data?.message ? error.response?.data?.message : 'CANT CONNECT TO SERVER'
          toast(response)
        })
        .finally(() => {
          setTimeout(() => setSpinner(false), 2000)
        })
    },
    [axios, setSpinner, storage, updateStorage]
  )

  const readPost = useCallback(
    async () => {
      setSpinner(true)
      await axios.get<IAxiosResponse<Array<IPost>>>(`/post`)
        .then(({ data: { result } }) => {
          const list = new Map<number, IPost>()
          result.forEach((user) => {
            list.set(user.userId, user)
          })
          updateStorage({ ...storage, list, state: true })
        })
        .catch((error) => {
          const response = error.response?.data?.message ? error.response?.data?.message : 'CANT CONNECT TO SERVER'
          updateStorage({ ...storage, errorCounter: ++storage.errorCounter })
          if (++storage.errorCounter === ERROR_COUNTER) toast(response)

        })
        .finally(() => {
          setTimeout(() => setSpinner(false), 2000)
        })
    },
    [axios, setSpinner, storage, updateStorage]
  )

  const updatePost = useCallback(
    async (postId: string, updatePost: IUpdatePost) => {
      setSpinner(true)
      await axios.put<IAxiosResponse<IPost>>(`/post/${postId}`, updatePost)
        .then(({ data: { result } }) => {
          const list = new Map<number, IPost>(storage.list.entries())
          list.set(result.postId, result)
          updateStorage({ ...storage, list, state: true })
          toast('Post actualizado con exito.')
        })
        .catch((error) => {
          const response = error.response?.data?.message ? error.response?.data?.message : 'CANT CONNECT TO SERVER'
          toast(response)
        })
        .finally(() => {
          setTimeout(() => setSpinner(false), 2000)
        })
    },
    [axios, setSpinner, storage, updateStorage]
  )

  const updateStatePost = useCallback(
    async (postId: string, postState: number) => {
      setSpinner(true)
      await axios.put<IAxiosResponse<IPost>>(`/post/state/${postId}`, { postState })
        .then(({ data: { result } }) => {
          const list = new Map<string, IPost>(storage.list.entries())
          list.set(result.postId, result)
          updateStorage({ ...storage, list, state: true })
          toast('Post actualizado con exito.')
        })
        .catch((error) => {
          const response = error.response?.data?.message ? error.response?.data?.message : 'CANT CONNECT TO SERVER'
          toast(response)
        })
        .finally(() => {
          setTimeout(() => setSpinner(false), 2000)
        })
    },
    [axios, setSpinner, storage, updateStorage]
  )

  const deletePost = useCallback(
    async (userId: string) => {
      setSpinner(true)
      await axios.delete<IAxiosResponse<string>>(`/post/${userId}`)
        .then(({ data: { result } }) => {
          const list = new Map<string, IPost>(storage.list.entries())
          list.delete(result)
          updateStorage({ ...storage, list, state: true })
          toast('Post eliminado con exito.')
        })
        .catch((error) => {
          const response = error.response?.data?.message ? error.response?.data?.message : 'CANT CONNECT TO SERVER'
          toast(response)
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
    postStorage: storage,
    createPost,
    readPost,
    updatePost,
    updateStatePost,
    deletePost
  }
}

export default usePostModel
