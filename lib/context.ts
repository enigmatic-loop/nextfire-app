import { createContext } from "react";

type UserContext = {
  user?: any,
  username?: string | null
}


export const UserContext = createContext<UserContext>({ user: null, username: null})