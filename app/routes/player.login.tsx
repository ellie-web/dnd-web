import type { ActionFunction, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import playerAuthenticator from "~/services/player-auth.server";
import authGuard from "~/utils/auth-guard";

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
  return await authGuard(args)
}

export const action: ActionFunction = async ({request}) => {
  await playerAuthenticator.authenticate('form', request, {
    successRedirect: '/player/character',
    failureRedirect: '/player/login',
  })
}

const PlayerLoginPage = () => {
  return (
    <Form method="post">
      <h1>Войти как игрок</h1>

      <p>Ещё не зарегистрированы? <Link to='/player/registration'>Регистрация</Link></p>

      <label htmlFor="name">Имя</label>
      <input type="text" name="name" id="name"/>

      <label htmlFor="password">Пароль</label>
      <input type="password" name="password" id="password"/>

      <button type="submit">
        Вход
      </button>
    </Form>
  )
}

export default PlayerLoginPage