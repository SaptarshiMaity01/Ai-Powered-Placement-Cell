// pages/ChatPage.js
import ChatPanel from "../admin/chat/ChatPanel";

const ChatPage = () => {
  return (
    <div className="min-h-screen bg-[#F3F2F0]">
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-linkedin-blue">Chat</h1>
        <ChatPanel />
      </div>
    </div>
  );
};

export default ChatPage;
