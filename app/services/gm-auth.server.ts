// app/services/auth.server.ts
import { Authenticator, AuthorizationError } from "remix-auth"
import { gmSessionStorage } from "~/services/gm-session.server"
import { FormStrategy } from "remix-auth-form"
import bcrypt from "bcryptjs"
import { prisma } from "~/db.server"
import type { GameMaster } from "@prisma/client"

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
const gmAuthenticator = new Authenticator<GameMaster>(gmSessionStorage)

const formStrategy = new FormStrategy(async ({form}) => {
  const name = form.get('name') as string
  const password = form.get('password') as string

  const gameMaster = await prisma.gameMaster.findUnique({ where: { name } })
  console.log('gm', gameMaster);
  
  if (!gameMaster) {
    console.log('wrong game master')
    throw new AuthorizationError()
  }

  const pwdMatch = await bcrypt.compare(password, gameMaster.password)

  if (!pwdMatch) {
    console.log('wrong password')
    throw new AuthorizationError()
  }

  return gameMaster
})

gmAuthenticator.use(formStrategy, 'form')

export default gmAuthenticator