import "./Chatbot.css";
import Conversation from "./components/Conversation.jsx";

function ChatBot() {
  return (
    <div className="ChatBot-Container">
      <div className="ChatBot-Header">
        <h1 className="ChatBot-Title">Chatbot</h1>
      </div>
      <Conversation />
    </div>
  );
}

export default ChatBot;
