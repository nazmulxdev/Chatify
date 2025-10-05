import React from "react";
import useChatStore from "../../store/useChatStore";

const ChatToggleButton = () => {
  const { activeTab, setActiveTab } = useChatStore();
  return (
    <div className="flex p-2 bg-base-200 border-b border-base-300">
      <div className="join w-full">
        <button
          className={`join-item btn btn-sm flex-1 ${
            activeTab === "chat" ? "btn-primary" : "btn-ghost"
          }`}
          onClick={() => setActiveTab("chat")}
        >
          💬 Chats
        </button>
        <button
          className={`join-item btn btn-sm flex-1 ${
            activeTab === "contacts" ? "btn-primary" : "btn-ghost"
          }`}
          onClick={() => setActiveTab("contacts")}
        >
          👥 Contacts
        </button>
      </div>
    </div>
  );
};

export default ChatToggleButton;
