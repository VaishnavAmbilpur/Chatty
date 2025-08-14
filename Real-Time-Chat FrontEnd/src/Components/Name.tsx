import { createContext, useContext } from "react"
export type NameContent = {
  name: string
  setname:(c: string) => void
}
export const MyNameContext = createContext<NameContent>({
name: '', // set a default value
setname: () => {},
})
export const useNameContext = () => useContext(MyNameContext)