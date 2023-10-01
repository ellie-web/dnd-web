import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import type { Socket } from "socket.io-client";

type ProviderProps = {
  socket: Socket | null,
  children: ReactNode
}

const context = createContext<Socket | null>(null)

export const useSocket = () => useContext(context)

export const SocketProvider = ({socket, children}: ProviderProps) => 
  <context.Provider value={socket}>{children}</context.Provider>