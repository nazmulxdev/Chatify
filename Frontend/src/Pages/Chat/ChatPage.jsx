import useGlobalContext from "../../Hooks/useGlobalContext";

const ChatPage = () => {
  const { email } = useGlobalContext();
  console.log(email);
  return (
    <div>
      <p>This is chat page.</p>
    </div>
  );
};

export default ChatPage;
