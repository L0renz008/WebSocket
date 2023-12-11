import express, { Application } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

interface IData {
  sender: string;
  message: string;
  date: { full: string; hours: string };
}
interface INewUser {
  username: string;
  socketId: string;
}

const URL = "http://localhost:5173";
const URL_HOST = "http://192.168.1.184:5173";

const app: Application = express();
app.use(cors());

const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

const io = new Server(server, {
  cors: {
    origin: [URL],
    methods: ["GET", "POST"],
  },
});

let users: INewUser[] = [];

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("message", (data) => {
    console.log(data);
    io.emit("messageResponse", data);
  });
  socket.on("newUser", (data: INewUser) => {
    console.log(data);
    users.push(data);
    io.emit("newUserResponse", users);
  });
  socket.on("typing", (data) => {
    socket.broadcast.emit("typingResponse", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("newUserResponse", users);
    socket.disconnect();
  });
});

server.listen(PORT, (): void => {
  console.log(`Server is listening here 👉 http://localhost:${PORT} `);
});
