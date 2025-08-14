import { createContext, useContext } from "react"
export type GlobalContent = {
  users: string
  setUser:(c: string) => void
}
export const MynumberContext = createContext<GlobalContent>({
users:"", // set a default value
setUser: () => {},
})
export const usenumberContext = () => useContext(MynumberContext)