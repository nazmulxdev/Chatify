import { useEffect, useState } from "react";
import GlobalContext from "./globalContext";
import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";

const GlobalContextProvider = ({ children }) => {
  const axiosInstance = useAxios();

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signupHandler = async (userDetails) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/signup", userDetails);
      setCurrentUser(res.data);
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Registration successful.",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const loginHandler = async (loginDetails) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/login", loginDetails);
      setCurrentUser(res.data);
      Swal.fire({
        icon: "success",
        title: "User login successful,",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const checkUser = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/check");
        if (isMounted) {
          setCurrentUser(res.data);
        }
      } catch (error) {
        console.log(error);
        if (isMounted) {
          setCurrentUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    checkUser();
    return () => {
      isMounted = false;
    };
  }, [axiosInstance]);

  console.log(currentUser);

  const contextData = {
    email: "nazmulxdev@gmail.com",
    currentUser,
    loading,
    setLoading,
    signupHandler,
    loginHandler,
  };
  return <GlobalContext value={contextData}>{children}</GlobalContext>;
};

export default GlobalContextProvider;
