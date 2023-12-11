import { useLayoutEffect, useEffect, useRef, useState } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";

import * as io from "socket.io-client";

interface ChatPageProps {
  socket: io.Socket;
}
interface IMessage {
  text: string;
  name: string;
  id: string;
  socketId: string;
}
const ChatPage = ({ socket }: ChatPageProps) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const firstMessageRef = useRef<HTMLDivElement>(null);

  const resetMessages = () => {
    setMessages([]);
  };

  useEffect(() => {
    socket.on("messageResponse", (data: IMessage) => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  useLayoutEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  return (
    <div className="chat">
      <ChatSidebar socket={socket} />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          lastMessageRef={lastMessageRef}
          firstMessageRef={firstMessageRef}
          typingStatus={typingStatus}
          resetMessages={resetMessages}
        />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
