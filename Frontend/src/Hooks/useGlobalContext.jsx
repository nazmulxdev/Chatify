import { useContext } from "react";
import GlobalContext from "../Context/globalContext";

const useGlobalContext = () => {
  const globalContext = useContext(GlobalContext);
  return globalContext;
};

export default useGlobalContext;
