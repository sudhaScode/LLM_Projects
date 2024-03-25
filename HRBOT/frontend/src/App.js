import "react-chatbot-kit/build/main.css";
import "./App.css";
import { ContextProvider } from "./store/Context";
import NavBar from "./components/nav/NavBar";
import LoginPage from "./components/login/LoginPage";
import { Route, Routes, useLocation } from "react-router-dom";
import ChatBot from "./Chatbot/maincomponent/ChatBot";
import UploadDocuments from "./components/uploaddocuments/UploadDocuments";

function App() {
  const location = useLocation();
  return (
    <ContextProvider>
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard/bot" element={<ChatBot />} />
        <Route
          path="/dashboard/uploaddocuments"
          element={<UploadDocuments />}
        />
      </Routes>
    </ContextProvider>
  );
}

export default App;
