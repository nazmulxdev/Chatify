import useGlobalContext from "../../Hooks/useGlobalContext";

const ChatPage = () => {
  const { currentUser } = useGlobalContext();
  console.log(currentUser);
  return (
    <div>
      <p>This is chat page.</p>
    </div>
  );
};

export default ChatPage;
