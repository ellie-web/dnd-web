import type { ActionFunction, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import bcrypt from 'bcryptjs'
import { prisma } from "~/db.server";
import authenticator from "~/services/auth.server";

export const loader: LoaderFunction = async ({request}: LoaderFunctionArgs) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  })
}

export const action: ActionFunction = async ({request}) => {
  const form = await request.clone().formData()
  const email = form.get('email') as string
  const password = form.get('password') as string

  const salt = await bcrypt.genSalt(10)
  const hashedPwd = await bcrypt.hash(password, salt)

  await prisma.user.create({
    data: {
      email,
      password: hashedPwd
    },
  });

  // const allUsers = await prisma.user.findMany()
  // console.log(allUsers)

  return await authenticator.authenticate('form', request, {
    successRedirect: '/',
    failureRedirect: '/login',
    context: {formData: form}
  })
}

const RegistrationPage = () => {
  return (
    <Form method="post">
      <h1>Registration</h1>

      <label htmlFor="email">Email</label>
      <input type="text" name="email" id="email"/>

      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password"/>

      <button type="submit">
        Register
      </button>
    </Form>
  )
}

export default RegistrationPage