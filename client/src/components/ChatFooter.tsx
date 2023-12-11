import { FormEvent, useState } from "react";
import * as io from "socket.io-client";

import sendButton from "../assets/sendButton.svg";
interface ChatFooterProps {
  socket: io.Socket;
}

export default function ChatFooter({ socket }: ChatFooterProps) {
  const [message, setMessage] = useState("");

  const handleTyping = () => {
    socket.emit("typing", `${localStorage.getItem("username")} is typing...`);
  };

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("typing", "");
    if (message.trim() && localStorage.getItem("username")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("username"),
        id: `${socket.id}${Math.random()}`,
        socketId: socket.id,
      });
    }
    setMessage("");
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">
          <img src={sendButton}></img>
        </button>
      </form>
    </div>
  );
}
