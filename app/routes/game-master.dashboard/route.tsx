import type { Character } from "@prisma/client";
import { json, type ActionFunction, type ActionFunctionArgs, type LoaderFunction, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Outlet, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { Socket} from "socket.io-client";
import { io } from "socket.io-client";
import { getCharacter, updateCharacter } from "~/models/character.server";
import { getPlayersAll } from "~/models/player.server";
import gmAuthenticator from "~/services/gm-auth.server";
import authGuard from "~/utils/auth-guard";
import CharacterEdit from "./character-edit";

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
  const {gm} = await authGuard(args)
  const players = await getPlayersAll()
  const characters = [] as Character[]

  // players.forEach(async player => {
  //   const c = await getCharacter(player.id)
  //   console.log(c)
  //   if (c) characters.push(c)
  // })

  for (const player of players) {
    const c = await getCharacter(player.id)
    console.log(c)
    if (c) characters.push(c)
  }

  console.log(characters)
  return json({gm, players, characters})
}

export const action: ActionFunction = async ({request}: ActionFunctionArgs) => {
  const form = await request.formData()
  const action = form.get('action')

  switch(action) {
    case 'logout': {
      await gmAuthenticator.logout(request, {
        redirectTo: '/'
      })
      return json({event: 'redirect'})
    }

    case 'updateCharacter': {
      // const payload = Object.fromEntries(form) as unknown as Character
      const characterData = {
        playerId: parseInt(form.get("playerId")?.toString() || ''),
        strength: parseInt(form.get("strength")?.toString() || ''),
        dexterity: parseInt(form.get("dexterity")?.toString() || ''),
        constitution: parseInt(form.get("constitution")?.toString() || ''),
        intelligence: parseInt(form.get("intelligence")?.toString() || ''),
        wisdom: parseInt(form.get("wisdom")?.toString() || ''),
        charisma: parseInt(form.get("charisma")?.toString() || ''),
      }
      await updateCharacter(characterData)
      return json({event: 'updateCharacter', timestamp: new Date()})
    }
  }

  return null
}

const GameMasterDashboardPage = () => {
  const {gm, characters} = useLoaderData<typeof loader>()
  // const [socket, setSocket] = useState<Socket>()

  // useEffect(() => {
  //   const socket = io()
  //   setSocket(socket)
  //   return () => {
  //     socket.close()
  //   };
  // }, []);

  // useEffect(() => {
  //   if (!socket) return
  //   socket.on("confirmation", (data) => {
  //     console.log(data)
  //   })

  // }, [socket])

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Страница гейм мастера {gm?.name}</h1>
      <Form method="post">
        <button type="submit" value="logout" name="action">Выйти</button>
      </Form>
      {/* <button type="button" onClick={() => socket?.emit("gm:change-player", "i changed some player!!")}>
        Send player:change
      </button> */}
      {characters.map((character: Character) => (
        <CharacterEdit {...character} key={character.id}/>
      ))}
    </div>
  );
}

export default GameMasterDashboardPage