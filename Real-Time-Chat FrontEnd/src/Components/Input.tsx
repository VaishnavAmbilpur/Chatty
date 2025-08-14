import { createContext, useContext } from "react"
export type InputContent = {
  input: string
  setinput:(c: string) => void
}
export const MyInputContext = createContext<InputContent>({
input: '', // set a default value
setinput: () => {},
})
export const useInputContext = () => useContext(MyInputContext)