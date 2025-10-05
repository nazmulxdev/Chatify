import useChatStore from "../../store/useChatStore";

const MessageArea = () => {
  const { selectedUser } = useChatStore();
  const messages = [
    { id: 1, text: "Hey! How are you doing?", time: "10:30 AM", isUser: false },
    {
      id: 2,
      text: "I'm good! Just working on some projects. How about you?",
      time: "10:31 AM",
      isUser: true,
    },
    {
      id: 3,
      text: "That's great! I'm also busy with work. Want to catch up later?",
      time: "10:32 AM",
      isUser: false,
    },
    {
      id: 4,
      text: "Sure, let's meet at 6 PM. Coffee?",
      time: "10:33 AM",
      isUser: true,
    },
  ];
  return (
    <div className="flex-1 flex flex-col bg-base-100">
      {/* Chat Header */}
      {selectedUser ? (
        <div className="flex items-center justify-between p-4 border-b border-base-300 bg-base-200">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center text-white font-bold">
                {selectedUser.name.charAt(0)}
              </div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-base-100"></div>
            </div>
            <div>
              <h2 className="font-semibold text-base-content">
                {selectedUser.name}
              </h2>
              <p className="text-sm text-base-content/70">
                {selectedUser.status}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="btn btn-ghost btn-circle btn-sm">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </button>
            <button className="btn btn-ghost btn-circle btn-sm">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center p-8 border-b border-base-300 bg-base-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-base-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-base-content/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-base-content">
              Select a chat to start messaging
            </h3>
            <p className="text-base-content/70">
              Choose a conversation from the sidebar
            </p>
          </div>
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-base-200">
        {selectedUser ? (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.isUser
                      ? "bg-primary text-primary-content rounded-br-none"
                      : "bg-base-300 text-base-content rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.isUser
                        ? "text-primary-content/70"
                        : "text-base-content/50"
                    } text-right`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-base-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-12 h-12 text-base-content/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-base-content mb-2">
                Welcome to ChatApp
              </h3>
              <p className="text-base-content/70">
                Select a conversation to start chatting
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      {selectedUser && (
        <div className="p-4 border-t border-base-300 bg-base-100">
          <div className="flex space-x-3">
            <button className="btn btn-ghost btn-circle btn-sm">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>

            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full pl-4 pr-12 py-3 bg-base-200 border border-base-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="absolute right-2 top-1.5 btn btn-primary btn-circle btn-sm">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>

            <button className="btn btn-ghost btn-circle btn-sm">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageArea;
