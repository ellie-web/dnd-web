import type { ActionFunction, ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import authGuard from "~/utils/auth-guard";

export const meta: MetaFunction = () => {
  return [
    { title: "DND" },
    { name: "description", content: "Light DND client" },
  ];
};

// export const loader: LoaderFunction = async ({request}: LoaderFunctionArgs) => {
//   const user = await authenticator.isAuthenticated(request, {
//     failureRedirect: '/login',
//   })

//   return {user}
// }

// export const action: ActionFunction = async ({request}: ActionFunctionArgs) => {
//   const form = await request.formData()
//   const action = form.get('action')

//   switch(action) {
//     case 'logout': {
//       return await authenticator.logout(request, {
//         redirectTo: '/login'
//       })
//     }
//   }
// }

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
  return await authGuard(args)
}

const IndexPage = () => {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      {/* <h1>Welcome to Remix, {user?.email}</h1>
      <Form method="post">
        <button type="submit" value="logout" name="action">Logout</button>
      </Form>
      <Outlet/> */}
      <Link to='/player/login'>Я игрок</Link>
      ---
      <Link to='/game-master/login'>Я гейм мастер</Link>
    </div>
  );
}

export default IndexPage
