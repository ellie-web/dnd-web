import type { ActionFunction, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import gmAuthenticator from "~/services/gm-auth.server";
import authGuard from "~/utils/auth-guard";

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
  return await authGuard(args)
}

export const action: ActionFunction = async ({request}) => {
  await gmAuthenticator.authenticate('form', request, {
    successRedirect: '/game-master/dashboard',
    failureRedirect: '/game-master/login',
  })
}

const GameMasterLoginPage = () => {
  return (
    <Form method="post">
      <h1>Войти как гейм мастер</h1>

      <p>Ещё не зарегистрированы? <Link to='/game-master/registration'>Регистрация</Link></p>

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

export default GameMasterLoginPage