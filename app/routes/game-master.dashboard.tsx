import type { ActionFunction, ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import gmAuthenticator from "~/services/gm-auth.server";
import authGuard from "~/utils/auth-guard";

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
  return await authGuard(args)
}

export const action: ActionFunction = async ({request}: ActionFunctionArgs) => {
  const form = await request.formData()
  const action = form.get('action')

  switch(action) {
    case 'logout': {
      return await gmAuthenticator.logout(request, {
        redirectTo: '/'
      })
    }
  }
}

const GameMasterDashboardPage = () => {
  const {gm} = useLoaderData<typeof loader>()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Страница гейм мастера {gm?.name}</h1>
      <Form method="post">
        <button type="submit" value="logout" name="action">Выйти</button>
      </Form>
      <Outlet/>
    </div>
  );
}

export default GameMasterDashboardPage