import type { ActionFunction, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import bcrypt from 'bcryptjs'
import { prisma } from "~/db.server";
import { createCharacter } from "~/models/character.server";
import playerAuthenticator from "~/services/player-auth.server";
import authGuard from "~/utils/auth-guard";

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
  return await authGuard(args)
}

export const action: ActionFunction = async ({request}) => {
  const form = await request.clone().formData()
  const name = form.get('name') as string
  const password = form.get('password') as string

  const salt = await bcrypt.genSalt(10)
  const hashedPwd = await bcrypt.hash(password, salt)

  try {
    const player = await prisma.player.create({
      data: {
        name,
        password: hashedPwd
      },
    });

    await createCharacter(player.id)
  }
  catch (err) {
    console.log('Error creating player')
  }

  // const allUsers = await prisma.user.findMany()
  // console.log(allUsers)

  return await playerAuthenticator.authenticate('form', request, {
    successRedirect: '/',
    failureRedirect: '/login',
    context: {formData: form}
  })
}

const PlayerRegistrationPage = () => {
  return (
    <Form method="post">
      <h1>Регистрация игрока</h1>

      <p>Уже зарегистрированы? <Link to='/player/login'>Войти</Link></p>
      
      <label htmlFor="name">Имя</label>
      <input type="text" name="name" id="name"/>

      <label htmlFor="password">Пароль</label>
      <input type="password" name="password" id="password"/>

      <button type="submit">летсгоооо</button>
    </Form>
  )
}

export default PlayerRegistrationPage