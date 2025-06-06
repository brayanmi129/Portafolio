import Inicio from "./pages/inicio/inicio";
import Lefay from "./pages/Lefay/Lefay";
import Premier from "./pages/Premier/Premier";
import ChatBot from "./pages/ChatBot/Chatbot";
import Working from "./pages/Working/working";
import ToDoList from "./pages/To-Do-List/ToDoList";

const routes = [
  { path: "/", element: <Inicio />, exact: true },
  { path: "/Lefay", element: <Lefay />, exact: true },
  { path: "/PremierLeague", element: <Premier />, exact: true },
  { path: "/ChatBot", element: <ChatBot />, exact: true },
  { path: "/To-Do-List", element: <ToDoList />, exact: true },
];

export default routes;
