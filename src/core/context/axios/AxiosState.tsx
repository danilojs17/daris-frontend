import React, { FC, useContext } from 'react'
import Axios, { AxiosInstance } from 'axios'
import PropTypes from 'prop-types'
import AxiosContext from './AxiosContext'
import { AuthContext } from '../auth/AuthContext'
import { IAxiosState } from '../../../data/interface/context/axios/Axios'
import { readItem } from '../../../shared/tools/local-storage/localStorage'

const AxiosState: FC<IAxiosState> = (props) => {
  const { logout } = useContext(AuthContext)

  const axios: AxiosInstance = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 6000
  })

  axios.interceptors.request.use(
    config => {
      const token = readItem('token', false)
      if (token) {
        if (config.headers)config.headers.Authorization = `Bearer ${token}`
      } else {
        delete axios.defaults.headers.common.Authorization
      }
      return config
    },
    error => Promise.reject(error)
  )

  axios.interceptors.response.use(response => {
    return response
  }, (error) => {
    if (error.response.status === 401) logout()
    return Promise.reject(error)
  })

  return (
    <AxiosContext.Provider value={axios}>
      {props.children}
    </AxiosContext.Provider>
  )
}

AxiosState.propTypes = {
  children: PropTypes.element
}

export default AxiosState
