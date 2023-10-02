import type { Character } from "@prisma/client";
import type { ActionFunction, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { getCharacter, updateCharacter } from "~/models/character.server";

// export const action: ActionFunction = async ({ request }) => {
//   const payload = Object.fromEntries(await request.formData()) as unknown as Character
//   return await updateCharacter(payload)
// }

const CharacterEdit = ({
  strength, 
  dexterity, 
  constitution, 
  intelligence, 
  wisdom, 
  charisma,
  playerId
}: Character) => {
  const fetcher = useFetcher()
  const isUpdating = fetcher.state !== "idle"

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

  useEffect(() => {
    if (!socket) return

    socket.emit("gm:change-player", "changedd")
  }, [socket, fetcher.data])
  
  return (
    <fetcher.Form method="PUT">
      <div className="grid grid-cols-3 gap-4 w-96 px-4">
        <div className="bg-stone-600 p-2 rounded flex flex-col items-center text-white">
          <label htmlFor="strength">strength</label>
          <input className="text-center w-16 bg-stone-400 rounded" type="text" name="strength" defaultValue={strength}/>
        </div>
        <div className="bg-stone-600 p-2 rounded flex flex-col items-center text-white">
          <label htmlFor="dexterity">dexterity</label>
          <input className="text-center w-16 bg-stone-400 rounded" type="text" name="dexterity" defaultValue={dexterity}/>
        </div>
        <div className="bg-stone-600 p-2 rounded flex flex-col items-center text-white">
          <label htmlFor="constitution">constitution</label>
          <input className="text-center w-16 bg-stone-400 rounded" type="text" name="constitution" defaultValue={constitution}/>
        </div>
        <div className="bg-stone-600 p-2 rounded flex flex-col items-center text-white">
          <label htmlFor="intelligence">intelligence</label>
          <input className="text-center w-16 bg-stone-400 rounded" type="text" name="intelligence" defaultValue={intelligence}/>
        </div>
        <div className="bg-stone-600 p-2 rounded flex flex-col items-center text-white">
          <label htmlFor="wisdom">wisdom</label>
          <input className="text-center w-16 bg-stone-400 rounded" type="text" name="wisdom" defaultValue={wisdom}/>
        </div>
        <div className="bg-stone-600 p-2 rounded flex flex-col items-center text-white">
          <label htmlFor="charisma">charisma</label>
          <input className="text-center w-16 bg-stone-400 rounded" type="text" name="charisma" defaultValue={charisma}/>
        </div>
      </div>
      <input style={{display: 'none'}} aria-hidden type="number" name="playerId" value={playerId} readOnly/>
      
      <div>
        <button 
        className="bg-blue-400 text-white rounded p-2 m-4"
          type="submit" 
          name="action"
          value="updateCharacter"
          disabled={isUpdating}>
          {isUpdating ? 'Обновление...' : 'Обновить'}
          </button>
      </div>
      <div>{JSON.stringify(fetcher.data)}</div>
    </fetcher.Form>
  )
}

export default CharacterEdit
