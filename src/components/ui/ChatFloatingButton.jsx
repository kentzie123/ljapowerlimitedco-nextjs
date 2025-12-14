"use client";

// Icons
import { MessageCircle, Loader2 } from "lucide-react";

// React Utils
import { useState } from "react";
import dynamic from "next/dynamic"; // 👈 Next.js specific lazy loader

// Stores
import { useAuthStore } from "@/stores/useAuthStore";

const ChatContainer = dynamic(() => import("./ChatContainer"), {
  ssr: false,
  loading: () => (
    <div className="fixed bottom-32 right-6 md:bottom-12 md:right-12 z-9999 bg-(--panel-blue) p-4 rounded-full shadow-xl border border-(--accent-yellow)">
      <Loader2 className="size-6 text-(--accent-yellow) animate-spin" />
    </div>
  ),
});

const ChatFloatingButton = () => {
  const { connectSocket, fetchClientLocalData, clientId, createClientAccount } =
    useAuthStore();

  const [openChat, setOpenChat] = useState(false);

  const openChatBox = async () => {
    connectSocket();

    setOpenChat(true);
    const isClientHaveData = await fetchClientLocalData();

    if (!isClientHaveData) {
      console.log(`No clientId: ${clientId}`);
      createClientAccount();
    }
  };

  return (
    <>
      {!openChat && (
        <button
          onClick={openChatBox}
          aria-label="Open Chat Window"
          className="animate-bouncing fixed flex items-center justify-center bottom-32 right-6 md:bottom-12 md:right-12 z-9999 bg-(--panel-blue) text-white gap-3 rounded-full border border-(--accent-yellow) shadow-xl px-4 py-2 md:px-8 md:py-4 transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] cursor-pointer"
        >
          <MessageCircle className="size-5 md:size-6 text-(--accent-yellow)" />
          <div className="font-heading font-bold text-lg md:text-xl uppercase tracking-wide">
            Chat Us!
          </div>
        </button>
      )}

      {openChat && <ChatContainer setOpenChat={setOpenChat} />}
    </>
  );
};

export default ChatFloatingButton;
