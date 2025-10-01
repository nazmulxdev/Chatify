import useGlobalContext from "../../Hooks/useGlobalContext";

const ChatPage = () => {
  const { currentUser, logoutHandler } = useGlobalContext();
  console.log(currentUser);
  const handleLogout = async () => {
    await logoutHandler();
  };
  return (
    <div>
      <div>
        <button
          onClick={handleLogout}
          className="btn btn-primary hover:cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
