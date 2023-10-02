import { json, type ActionFunction, type ActionFunctionArgs, type LoaderFunction, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Outlet, useLoaderData, useRevalidator } from "@remix-run/react";
import playerAuthenticator from "~/services/player-auth.server";
// import type { AuthT } from "~/utils/auth-guard";
import authGuard from "~/utils/auth-guard";
import { useEffect, useState } from "react";
import type { Socket } from "socket.io-client";
import io from "socket.io-client";
// import { SocketProvider } from "~/context";
import { getCharacter } from "~/models/character.server";
import CharacterStats from "./character-stats";

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
  const {player} = await authGuard(args)

  const character = await getCharacter(player.id)

  // const response = await fetch(`localhost:3000/api/character/${player.id}`)
  // console.log(response)
  // const character: any = await response.json()
  
  return json({player, character})
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
  const {player, character} = useLoaderData<typeof loader>()
  const [socket, setSocket] = useState<Socket>()
  const revalidator = useRevalidator()

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
      revalidator.revalidate()
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
      <CharacterStats {...character}/>
      {/* <Outlet context={{playerId: player?.id}}/> */}
    </div>
  );
}

export default PlayerCharacterPage