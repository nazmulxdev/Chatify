import { useEffect, useState } from "react";
import GlobalContext from "./globalContext";
import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";
import { data } from "react-router";

const GlobalContextProvider = ({ children }) => {
  const axiosInstance = useAxios();

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // chat related context

  // const [allContacts, setAllContacts] = useState([]);
  // const [chats, setChats] = useState();
  // const [messages, setMessages] = useState();
  // const [activeTab, setActiveTab] = useState("chats");
  // const [selectedUser, setSelectedUser] = useState(null);
  // const [isUsersLoading, setUsersLoading] = useState(false);
  // const [isMessagesLoading, setMessagesLoading] = useState(false);
  // const [isSoundEnabled, setSoundEnabled] = useState(false);

  // const toggleSound = () => {
  //   localStorage.setItem("isSoundEnabled", !isSoundEnabled);
  //   setSoundEnabled(!isSoundEnabled);
  // };

  // const toggleActiveTab=()=>{

  // }

  // auth related context

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
  const logoutHandler = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/logout");
      setCurrentUser(null);
      Swal.fire({
        icon: "success",
        title: `${res?.data?.message}`,
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

  const profilePicUploader = async (profilePic) => {
    try {
      const res = await axiosInstance.put("/update-profile", profilePic);
      setCurrentUser(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAllContacts = async () => {
    try {
      const res = await axiosInstance.get("/contacts");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  handleGetAllContacts().then((data) => {
    console.log(data);
  });

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
    logoutHandler,
    profilePicUploader,
    handleGetAllContacts,
  };
  return (
    <GlobalContext.Provider value={contextData}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
