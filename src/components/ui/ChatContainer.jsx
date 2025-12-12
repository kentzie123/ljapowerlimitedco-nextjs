// Icons
import { X } from "lucide-react";

// UI
import SendMessage from "./SendMessage";
import ChatBubble from "./ChatBubble";

// Stores
import { useChatStore } from "@/stores/useChatStore";
import { useAuthStore } from "@/stores/useAuthStore";

// Hooks
import { useEffect, useRef } from "react";

const ChatContainer = ({ setOpenChat }) => {
  const chatContainerRef = useRef();
  const { messages = [] } = useChatStore();
  const { clientId } = useAuthStore();

  const systemGeneratedMessage = {
    id: "system-welcome",
    created_at: new Date(),
    text: `Hi! 👋 \nThank you for contacting LJA Power Limited Co Support. \nTo help us assist you efficiently, please provide the following details:\n\nGenerator Questions Inquiry\nHow many KVA?\nSilent Type or Open Type:\nSingle Phase or Three Phase:\nStandby or Prime:\nHow many Volts:\nHow many Amperes is your main breaker:`,
  };

  // 1. Auto-scroll to bottom when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // 2. SCROLL LOCK FIX
  useEffect(() => {
    const el = chatContainerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      e.stopPropagation();
      const { scrollTop, scrollHeight, clientHeight } = el;
      const isAtTop = scrollTop === 0;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;
      const isScrollingUp = e.deltaY < 0;
      const isScrollingDown = e.deltaY > 0;

      if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
        e.preventDefault();
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-4 sm:right-4 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 z-50 w-full sm:w-[25rem] sm:h-[35rem] rounded-none sm:rounded-xl shadow-2xl flex flex-col overflow-hidden border-0 sm:border border-[var(--card-blue)] bg-white">
      {/* Header */}
      <div className="bg-[var(--panel-blue)] text-white flex items-center justify-between p-4 border-b border-[var(--card-blue)]">
        <div className="flex items-center gap-3">
          <img
            className="w-8 h-8 rounded-full bg-white object-contain"
            src="/images/lja-logo.webp"
            alt="lja logo"
          />
          <div className="font-semibold text-sm sm:text-base">
            LJA Chat Support
          </div>
        </div>
        <button
          onClick={() => setOpenChat(false)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent-yellow)] focus:ring-opacity-50"
          aria-label="Close chat"
        >
          <X
            size={20}
            className="text-white hover:text-white transition-colors"
          />
        </button>
      </div>

      {/* Messages Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 bg-white overflow-y-scroll overscroll-contain
        [scrollbar-width:auto]
        [scrollbar-color:#d1d5db_transparent]
        [&::-webkit-scrollbar]:!block
        [&::-webkit-scrollbar]:!w-3
        [&::-webkit-scrollbar-track]:!bg-gray-100
        [&::-webkit-scrollbar-thumb]:!bg-gray-400
        [&::-webkit-scrollbar-thumb]:!rounded-full
        [&::-webkit-scrollbar-thumb]:!border-2
        [&::-webkit-scrollbar-thumb]:!border-white"
      >
        <div className="px-3 py-4 space-y-4 min-h-full">
          <ChatBubble message={systemGeneratedMessage} isMine={false} />
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message}
              isMine={clientId === message.sender_id}
            />
          ))}
        </div>
      </div>

      {/* Input */}
      <SendMessage />
    </div>
  );
};

export default ChatContainer;
