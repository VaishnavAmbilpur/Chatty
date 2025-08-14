import { createContext, useContext } from "react"
export type GlobalContent = {
  code: string
  setcode:(c: string) => void
}
export const MyGlobalContext = createContext<GlobalContent>({
code: '', // set a default value
setcode: () => {},
})
export const useGlobalContext = () => useContext(MyGlobalContext)