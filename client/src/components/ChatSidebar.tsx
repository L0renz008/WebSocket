import { useEffect, useState } from "react";
import * as io from "socket.io-client";

interface ChatBarProps {
  socket: io.Socket;
}

interface IUser {
  username: string;
  socketId: string;
}

export default function ChatBar({ socket }: ChatBarProps) {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    socket.on("newUserResponse", (data: IUser[]) => setUsers(data));
  }, [socket, users]);
  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketId}>{user.username}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
