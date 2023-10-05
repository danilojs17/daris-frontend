import React, { FC } from 'react'
import { toast, ToastOptions } from 'react-toastify'
import styles from './Toast.module.scss'

const ToastContainer: FC<{message: string}> = ({ message }) => {
  return (
    <div className={styles.toast_container}>
      <div className={styles.toast_message}>
        {message}
      </div>
    </div>
  )
}

export const showToast = (type: 'success'|'error'|'info'|'warning' |'loading', message: string, options: ToastOptions = {}) => {
  const selectedToast = toast[type]
  selectedToast(<ToastContainer message={message} />, options)
}

export default showToast
