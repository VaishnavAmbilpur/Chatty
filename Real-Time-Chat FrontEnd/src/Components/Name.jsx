import { createContext, useContext } from "react";
export const MyNameContext = createContext({
  name: "", // set a default value
  setname: () => {},
});
export const useNameContext = () => useContext(MyNameContext);
