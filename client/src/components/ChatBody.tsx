import { RefObject, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IMessage {
  text: string;
  name: string;
  id: string;
  socketId: string;
}
interface ChatBodyProps {
  messages: IMessage[];
  lastMessageRef: RefObject<HTMLDivElement>;
  firstMessageRef: RefObject<HTMLDivElement>;
  typingStatus: string;
  resetMessages(): void;
}

export default function ChatBody({
  messages,
  lastMessageRef,
  firstMessageRef,
  typingStatus,
  resetMessages,
}: ChatBodyProps) {
  const navigate = useNavigate();
  const [atTop, setAtTop] = useState(true);

  const handleLeaveCHat = () => {
    localStorage.removeItem("username");
    navigate("/");
    window.location.reload();
  };
  const handleReturnToTop = () => {
    firstMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleScroll = () => {
    document.getElementsByClassName("message__container")[0].scrollTop <= 20
      ? setAtTop(true)
      : setAtTop(false);
  };

  return (
    <div className="chat__body">
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <div className="mainHeader__buttons">
          <button className="resetChat__btn" onClick={resetMessages}>
            RESET
          </button>{" "}
          <button className="leaveChat__btn" onClick={handleLeaveCHat}>
            LEAVE CHAT
          </button>
        </div>
      </header>
      <div className="message__container" onScroll={handleScroll}>
        <div ref={firstMessageRef} />
        {messages.map((message) =>
          message.name === localStorage.getItem("username") ? (
            <div className="message__chats" key={message.id}>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        {/*This is triggered when a user is typing*/}
        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
      {atTop ? null : (
        <div className="returnToTop" onClick={handleReturnToTop}>
          <svg
            height="30"
            viewBox="0 0 30 30"
            width="30"
            xmlns="http://www.w3.org/2000/svg"
            fill="rgba(51,51,51,0.7)"
          >
            <path d="m21.646 19.068 1.708-1.708q.318-.318.318-.754t-.318-.754l-7.6-7.6q-.318-.318-.754-.318t-.754.318l-7.601 7.6q-.318.318-.318.754t.318.754l1.708 1.708q.318.318.754.318t.754-.318l5.14-5.14 5.14 5.14q.318.318.754.318t.754-.318zM27.857 15q0 3.499-1.724 6.454t-4.679 4.679T15 27.857t-6.454-1.724-4.679-4.679T2.143 15t1.724-6.454 4.679-4.679T15 2.143t6.454 1.724 4.679 4.679T27.857 15z" />
          </svg>
        </div>
      )}
    </div>
  );
}
