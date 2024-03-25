import Chatbot from "react-chatbot-kit";
import config from "../chatbotcomponents/config";
import MessageParser from "../chatbotcomponents/MessageParser";
import ActionProvider from "../chatbotcomponents/ActionProvider";
import "../../App.css";

function ChatBot() {
  return (
    <div className="App">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}

export default ChatBot;
