import { useEffect } from "react";
import useChatStore from "../../store/useChatStore";
import UserLoader from "./UserLoader";

const ContactList = () => {
  const {
    selectedUser,
    setSelectedUser,
    isUserLoading,
    allContacts,
    getAllContacts,
    getMessagesByUserId,
  } = useChatStore();

  useEffect(() => {
    getAllContacts();
    getMessagesByUserId(selectedUser?._id);
  }, [getAllContacts, getMessagesByUserId, selectedUser]);

  if (isUserLoading) return <UserLoader></UserLoader>;
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-1 p-2">
        {allContacts.map((user) => (
          <div
            key={user._id}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedUser?._id === user._id
                ? "bg-primary/20 border border-primary/30"
                : "hover:bg-base-200"
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center text-white font-bold">
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span>{user?.fullName.charAt(0)}</span>
                )}
              </div>
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-base-100 ${
                  user.status === "online"
                    ? "bg-green-500"
                    : user.status === "away"
                    ? "bg-yellow-500"
                    : "bg-gray-500"
                }`}
              ></div>
            </div>

            <div className="flex-1 ml-3 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-base-content truncate">
                  {user.fullName}
                </h3>
                {/* Optional: backend doesn’t send time/unread yet */}
                <span className="text-xs text-base-content/50">
                  {user.time || ""}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-base-content/70 truncate">
                  {user.lastMessage || ""}
                </p>
                {user.unread > 0 && (
                  <span className="bg-primary text-primary-content text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {user.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
