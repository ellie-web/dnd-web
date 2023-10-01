// app/services/auth.server.ts
import { Authenticator, AuthorizationError } from "remix-auth"
import { playerSessionStorage } from "~/services/player-session.server"
import { FormStrategy } from "remix-auth-form"
import bcrypt from "bcryptjs"
import { prisma } from "~/db.server"
import type { Player } from "@prisma/client"

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
const playerAuthenticator = new Authenticator<Player>(playerSessionStorage)

const formStrategy = new FormStrategy(async ({form}) => {
  const name = form.get('name') as string
  const password = form.get('password') as string

  const player = await prisma.player.findUnique({ where: { name } })

  if (!player) {
    console.log('wrong game master')
    throw new AuthorizationError()
  }

  const pwdMatch = await bcrypt.compare(password, player.password)

  if (!pwdMatch) {
    console.log('wrong password')
    throw new AuthorizationError()
  }

  return player
})

playerAuthenticator.use(formStrategy, 'form')

export default playerAuthenticator