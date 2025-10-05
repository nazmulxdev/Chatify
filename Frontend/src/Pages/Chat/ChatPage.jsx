// import { useState } from "react";
import ChatToggleButton from "./ChatToggleButton";
import ContactList from "./ContactList";
import MessageArea from "./MessageArea";
import ProfileHeader from "./ProfileHeader";

const ChatPage = () => {
  // const [activeTab, setActiveTab] = useState("chat");
  // const [selectedUser, setSelectedUser] = useState(null);

  // Mock data

  return (
    <div className="flex h-[800px] max-w-screen-2xl bg-base-200">
      {/* Left Sidebar */}
      <div className="flex flex-col w-full md:w-80 lg:w-96 bg-base-100 border-r border-base-300">
        {/* Top Header */}

        <ProfileHeader></ProfileHeader>
        {/* Chat/Contacts Toggle */}
        <ChatToggleButton></ChatToggleButton>

        {/* Search Bar */}
        <div className="p-3 border-b border-base-300">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-base-200 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-base-content/50"
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
          </div>
        </div>

        {/* Chat/Contact List */}
        <ContactList></ContactList>
      </div>

      {/* Right Chat Area */}
      <MessageArea></MessageArea>
    </div>
  );
};

export default ChatPage;
