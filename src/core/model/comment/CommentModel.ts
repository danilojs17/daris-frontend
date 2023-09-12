import { toast } from 'react-hot-toast';
import { useCallback, useContext, useEffect } from 'react'
import AxiosContext from '@context/axios/AxiosContext'
import { useStorage } from '@context/global-state/GlobalState'
import { IAxiosResponse } from '@interface/context/axios/Axios'
import { ERROR_COUNTER } from '@constant/variables'
import useSpinnerModel from '@model/spinner/SpinnerModel'
import { IComment, ICommentModel, ICommentStorage, ICreateComment, IUpdateComment } from '@interface/core/model/comment/Comment';

const usePostModel = (): ICommentModel => {
  const axios = useContext(AxiosContext)
  const initialState: ICommentStorage = {
    state: false,
    list: new Map<string, IComment>(),
    errorCounter: 0
  }
  const { storage, updateStorage } = useStorage<ICommentStorage>('comment', initialState)
  const { setSpinner } = useSpinnerModel()

  const createComment = useCallback(async (comment: ICreateComment) => {
      setSpinner(true)
      await axios.post<IAxiosResponse<IComment>>(`/comment`, comment)
        .then(({ data: { result } }) => {
          const list = new Map<string, IComment>(storage.list.entries())
          list.set(result.userId, result)
          updateStorage({ ...storage, list, state: true })
          toast('Comentario exisotoso.')
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

  const readComment = useCallback(async () => {
      setSpinner(true)
      await axios.get<IAxiosResponse<Array<IComment>>>(`/comment`)
        .then(({ data: { result } }) => {
          const list = new Map<string, IComment>()
          result.forEach((comment) => {
            list.set(comment.commentId, comment)
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

  const updateComment = useCallback(
    async (commentId: string, updateComment: IUpdateComment) => {
      setSpinner(true)
      await axios.put<IAxiosResponse<IComment>>(`/comment/${commentId}`, updateComment)
        .then(({ data: { result } }) => {
          const list = new Map<string, IComment>(storage.list.entries())
          list.set(result.commentId, result)
          updateStorage({ ...storage, list, state: true })
          toast('Comentario actualizado con exito.')
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


  const deleteComment = useCallback(
    async (userId: string) => {
      setSpinner(true)
      await axios.delete<IAxiosResponse<string>>(`/comment/${userId}`)
        .then(({ data: { result } }) => {
          const list = new Map<string, IComment>(storage.list.entries())
          list.delete(result)
          updateStorage({ ...storage, list, state: true })
          toast('Comentario eliminado con exito.')
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
    if (!storage.state && storage.errorCounter < ERROR_COUNTER) readComment()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storage.errorCounter, storage.state])

  return {
    commentStorage: storage,
    createComment,
    readComment,
    updateComment,
    deleteComment
  }
}

export default usePostModel
