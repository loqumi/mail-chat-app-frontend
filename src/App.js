import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./components/Login";
import Mails from "./pages/Mails";
import MailSend from "./pages/MailSend";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/mails" element={<Mails />} />
        <Route path="/send" element={<MailSend />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
