import useChatStore from "../../store/useChatStore";

const ContactList = () => {
  const users = [
    {
      id: 1,
      name: "John Doe",
      status: "online",
      lastMessage: "Hey there!",
      time: "2 min ago",
      unread: 2,
    },
    {
      id: 2,
      name: "Sarah Smith",
      status: "online",
      lastMessage: "See you tomorrow",
      time: "1 hour ago",
      unread: 0,
    },
    {
      id: 3,
      name: "Mike Johnson",
      status: "away",
      lastMessage: "Thanks for the help!",
      time: "3 hours ago",
      unread: 1,
    },
    {
      id: 4,
      name: "Emily Davis",
      status: "offline",
      lastMessage: "Are you available?",
      time: "1 day ago",
      unread: 0,
    },
    {
      id: 5,
      name: "Alex Wilson",
      status: "online",
      lastMessage: "Meeting at 3 PM",
      time: "2 days ago",
      unread: 0,
    },
  ];
  const contacts = [
    { id: 1, name: "Alice Brown", status: "online" },
    { id: 2, name: "Bob Miller", status: "away" },
    { id: 3, name: "Carol White", status: "offline" },
    { id: 4, name: "David Lee", status: "online" },
  ];
  const { activeTab, selectedUser, setSelectedUser } = useChatStore();
  return (
    <div className="flex-1 overflow-y-auto">
      {activeTab === "chat" ? (
        /* Chat List */
        <div className="space-y-1 p-2">
          {users.map((user) => (
            <div
              key={user.id}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedUser?.id === user.id
                  ? "bg-primary/20 border border-primary/30"
                  : "hover:bg-base-200"
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0)}
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
                    {user.name}
                  </h3>
                  <span className="text-xs text-base-content/50">
                    {user.time}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-base-content/70 truncate">
                    {user.lastMessage}
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
      ) : (
        /* Contact List */
        <div className="space-y-1 p-2">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-base-200 transition-all duration-200"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center text-white font-bold">
                  {contact.name.charAt(0)}
                </div>
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-base-100 ${
                    contact.status === "online"
                      ? "bg-green-500"
                      : contact.status === "away"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  }`}
                ></div>
              </div>

              <div className="ml-3">
                <h3 className="font-semibold text-base-content">
                  {contact.name}
                </h3>
                <p className="text-sm text-base-content/70 capitalize">
                  {contact.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
