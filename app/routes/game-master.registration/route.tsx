import type { ActionFunction, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import bcrypt from 'bcryptjs'
import { prisma } from "~/db.server";
import gmAuthenticator from "~/services/gm-auth.server";
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

  await prisma.gameMaster.create({
    data: {
      name,
      password: hashedPwd
    },
  });

  // const allUsers = await prisma.user.findMany()
  // console.log(allUsers)

  return await gmAuthenticator.authenticate('form', request, {
    successRedirect: '/',
    failureRedirect: '/login',
    context: {formData: form}
  })
}

const GameMasterRegistrationPage = () => {
  return (
    <Form method="post">
      <h1>Регистрация гейм мастера</h1>

      <p>Уже зарегистрированы? <Link to='/login'>Войти</Link></p>
      
      <label htmlFor="name">Имя</label>
      <input type="text" name="name" id="name"/>

      <label htmlFor="password">Пароль</label>
      <input type="password" name="password" id="password"/>

      <button type="submit">летсгоооо</button>
    </Form>
  )
}

export default GameMasterRegistrationPage