import React, { FC, useEffect } from 'react'
import io, { Socket } from 'socket.io-client'
import SocketContext from './SocketContext'
import { ISocketState } from '@interface/context/socket/Axios'

const SocketState: FC<ISocketState> = (props) => {
  const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
    path: '/main',
    reconnection: true,
    autoConnect: true
  })

  useEffect(() => {
    return () => {
      socket.disconnect()
    }
  }, [socket])

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  )
}

export default SocketState
