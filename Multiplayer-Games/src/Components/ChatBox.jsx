import { useEffect, useState, useRef } from "react";
import "./ChatBox.css";
import PropTypes from "prop-types";

const ChatBox = ({ socket, roomName }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("Player");
  const chatboxRef = useRef(null);

  useEffect(() => {
    const handleReceiveMsg = (data) => {
      console.log(data.msg) 
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.msg, sender: data.name },
      ]);
    };

    socket.current.on("receiveMsg", handleReceiveMsg);

  }, [socket.current]);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;
    const newMessage = { text: input, sender: "You" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    socket.current.emit("sendMsg", {
      name: userName,
      msg: input,
      room: roomName.current,
    });
    setInput("");
  };

  return (
    <div className="chatbox">
      <div className="chat-messages" ref={chatboxRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "You" ? "sent" : "received"
            }`}
          >
            <span className="sender">{msg.sender}:</span> {msg.text}
          </div>
        ))}
      </div>
      <div className="msgBox">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button className="send" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

ChatBox.propTypes = {
  socket: PropTypes.object.isRequired,
  roomName: PropTypes.object.isRequired,
};

export default ChatBox;
