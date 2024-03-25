import { createChatBotMessage } from "react-chatbot-kit";
import Avatar from "../components/Avatar";
import UserAvatar from '../components/UserAvatar';
import StartBtn from "../components/StartBtn";
import StartSlow from "../components/StartSlow";
import data from "./data";
import DipslayImage from "../components/DipslayImage";

const config = {
  initialMessages: [
    createChatBotMessage(`Welcome to Hr chat bot!`, {
      widget: "startBtn",
    }),
  ],
  customComponents: {
    botAvatar: (props) => <Avatar {...props} />,
    userAvatar: (props) => <UserAvatar {...props} />,
    header: () => null,
  },
  state: {
    checker: null,
    data,
    userData: {
      name: "",
      age: 0,
      category: "",
      product: {
        name: "",
        link: "",
        imageUrl: "",
      },
    },
  },
  widgets: [
    {
      widgetName: "startBtn",
      widgetFunc: (props) => <StartBtn {...props} />,
    },
    {
      widgetName: "startSlow",
      widgetFunc: (props) => <StartSlow {...props} />,
    },
    {
      widgetName: "finalImage",
      widgetFunc: (props) => <DipslayImage {...props} />,
    },
  ],
};

export default config;
