import useGlobalContext from "../Hooks/useGlobalContext";
import { Navigate, useLocation } from "react-router";
import LoadingComponent from "../Utilities/LoadingComponent";

const PrivateRoutes = ({ children }) => {
  const { currentUser, loading } = useGlobalContext();
  const location = useLocation();
  if (loading) {
    return <LoadingComponent isLoading={loading}></LoadingComponent>;
  }

  if (currentUser) {
    return children;
  }

  return <Navigate state={location.pathname} to={"/auth/login"}></Navigate>;
};

export default PrivateRoutes;
