import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as io from "socket.io-client";

interface HomeProps {
  socket: io.Socket;
}

export default function Home({ socket }: HomeProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    socket.emit("newUser", { username, socketId: socket.id });
    navigate("/chat");
  };

  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="home__cta">SIGN IN</button>
    </form>
  );
}
