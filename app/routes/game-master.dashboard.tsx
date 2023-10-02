import type { ActionFunction, ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { Socket} from "socket.io-client";
import { io } from "socket.io-client";
import gmAuthenticator from "~/services/gm-auth.server";
import authGuard from "~/utils/auth-guard";

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
  return await authGuard(args)
}

export const action: ActionFunction = async ({request}: ActionFunctionArgs) => {
  const form = await request.formData()
  const action = form.get('action')

  switch(action) {
    case 'logout': {
      return await gmAuthenticator.logout(request, {
        redirectTo: '/'
      })
    }
  }
}

const GameMasterDashboardPage = () => {
  const {gm} = useLoaderData<typeof loader>()
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

  }, [socket])

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Страница гейм мастера {gm?.name}</h1>
      <Form method="post">
        <button type="submit" value="logout" name="action">Выйти</button>
      </Form>
      <button type="button" onClick={() => socket?.emit("gm:change-player", "i changed some player!!")}>
        Send player:change
      </button>
      <Outlet/>
    </div>
  );
}

export default GameMasterDashboardPage