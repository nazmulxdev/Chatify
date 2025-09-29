import GlobalContext from "./globalContext";

const GlobalContextProvider = ({ children }) => {
  const contextData = {
    email: "nazmulxdev@gmail.com",
  };
  return <GlobalContext value={contextData}>{children}</GlobalContext>;
};

export default GlobalContextProvider;
