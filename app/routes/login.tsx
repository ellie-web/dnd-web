import type { ActionFunction, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import authenticator from "~/services/auth.server";

export const loader: LoaderFunction = async ({request}: LoaderFunctionArgs) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  })
}

export const action: ActionFunction = async ({request}) => {
  await authenticator.authenticate('form', request, {
    successRedirect: '/',
    failureRedirect: '/login',
  })
}

const LoginPage = () => {
  return (
    <Form method="post">
      <h1>Log in</h1>

      <label htmlFor="email">Email</label>
      <input type="text" name="email" id="email"/>

      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password"/>

      <button type="submit">
        Log in
      </button>
    </Form>
  )
}

export default LoginPage