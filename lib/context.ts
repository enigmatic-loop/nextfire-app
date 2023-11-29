import { createContext } from "react";

type UserContext = {
  user: object | null,
  username: string | null
}


export const UserContext = createContext<UserContext>({ user: null, username: null})