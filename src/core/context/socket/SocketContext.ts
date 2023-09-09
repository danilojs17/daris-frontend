import { Context, createContext } from 'react'
import { Socket } from 'socket.io-client'

const SocketContext: Context<Socket | null> = createContext<Socket | null>(null)

export default SocketContext
