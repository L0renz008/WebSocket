import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";
import TestDB from "./pages/TestDB";
import * as io from "socket.io-client";

const socket = io.connect("http://localhost:8080");

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
          <Route path="/testdb" element={<TestDB />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
