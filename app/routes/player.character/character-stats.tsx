import type { Character } from "@prisma/client"

const CharacterStats = ({
  strength, 
  dexterity, 
  constitution, 
  intelligence, 
  wisdom, 
  charisma
}: Character) => {
  return (
    <div className="grid grid-cols-3 gap-4 w-96 px-4">
      <div className="bg-stone-600 p-2 rounded flex flex-col items-center text-white">strength: <span>{strength}</span></div>
      <div className="bg-stone-600 p-2 rounded flex flex-col items-center text-white">dexterity: <span>{dexterity}</span></div>
      <div className="bg-stone-600 p-2 rounded flex flex-col items-center text-white">constitution: <span>{constitution}</span></div>
      <div className="bg-stone-600 p-2 rounded flex flex-col items-center text-white">intelligence: <span>{intelligence}</span></div>
      <div className="bg-stone-600 p-2 rounded flex flex-col items-center text-white">wisdom: <span>{wisdom}</span></div>
      <div className="bg-stone-600 p-2 rounded flex flex-col items-center text-white">charisma: <span>{charisma}</span></div>
    </div>
  )
}

export default CharacterStats