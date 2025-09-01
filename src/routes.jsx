import Inicio from "./pages/inicio/inicio";
import Lefay from "./pages/Lefay/Lefay";
import ChatBot from "./pages/ChatBot/Chatbot";
import PineNotes from "./pages/To-Do-List/PineNotes";

const routes = [
  { path: "/", element: <Inicio />, exact: true },
  { path: "/Lefay", element: <Lefay />, exact: true },
  { path: "/ChatBot", element: <ChatBot />, exact: true },
  { path: "/Pinned-notes", element: <PineNotes />, exact: true },
];

export default routes;
