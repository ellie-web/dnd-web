import type { LoaderFunctionArgs} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import gmAuthenticator from "~/services/gm-auth.server";
import playerAuthenticator from "~/services/player-auth.server";

const publicRoutes = [
  '/',
  '/player/login',
  '/game-master/login',
  '/player/registration',
  '/game-master/registration'
]

export type AuthT = {
  gm: {
      id: number;
      name: string;
      password: string;
  };
  player?: undefined;
} | {
  player: {
      id: number;
      name: string;
      password: string;
  };
  gm?: undefined;
}

export default async function authGuard(args: LoaderFunctionArgs) {
  const url = new URL(args.request.url)

  const gm = await gmAuthenticator.isAuthenticated(args.request)
  if (gm) {
    if (url.pathname !== '/game-master/dashboard') {
      throw redirect('/game-master/dashboard')
    }
    return {gm} as AuthT
  }

  const player = await playerAuthenticator.isAuthenticated(args.request)
  if (player) {
    if (url.pathname !== '/player/character') {
      throw redirect('/player/character')
    }
    return {player} as AuthT
  }

  
  return publicRoutes.includes(url.pathname) ? false : redirect('/')
}
