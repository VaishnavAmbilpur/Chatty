import { createContext, useContext } from "react";
export const MyGlobalContext = createContext({
  code: "", // set a default value
  setcode: () => {},
});
export const useGlobalContext = () => useContext(MyGlobalContext);
