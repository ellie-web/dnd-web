import type { ActionFunction, ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import playerAuthenticator from "~/services/player-auth.server";
import authGuard from "~/utils/auth-guard";
import { useEffect, useState } from "react";
import type { Socket } from "socket.io-client";
import io from "socket.io-client";
import { SocketProvider } from "~/context";

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
  return await authGuard(args)
}

export const action: ActionFunction = async ({request}: ActionFunctionArgs) => {
  const form = await request.formData()
  const action = form.get('action')

  switch(action) {
    case 'logout': {
      return await playerAuthenticator.logout(request, {
        redirectTo: '/'
      })
    }
  }
}

const PlayerCharacterPage = () => {
  const {player} = useLoaderData<typeof loader>()
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    const socket = io()
    setSocket(socket)
    return () => {
      socket.close()
    };
  }, []);

  useEffect(() => {
    if (!socket) return
    socket.on("confirmation", (data) => {
      console.log(data)
    })

    socket.on("player:changed", (data) => {
      console.log("player:changed", data)
    })
  }, [socket])

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Профиль игрока {player?.name}</h1>
      <Form method="post">
        <button type="submit" value="logout" name="action">Выйти</button>
      </Form>
      <button type="button" onClick={() => socket?.emit("event", "ping")}>
        Send ping
      </button>
      <Outlet/>
    </div>
  );
}

export default PlayerCharacterPage