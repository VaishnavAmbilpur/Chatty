import { createContext, useContext } from "react";
export const MyInputContext = createContext({
  input: "",
  setinput: () => {},
});
export const useInputContext = () => useContext(MyInputContext);
