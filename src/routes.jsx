import Inicio from "./pages/inicio/inicio";
import Ecomerce from "./pages/E-comerce/Ecomerce";
import Premier from "./pages/Premier/Premier";
import ChatBot from "./pages/ChatBot/Chatbot";
import Working from "./pages/Working/working";

const routes = [
  { path: "/", element: <Inicio />, exact: true },
  { path: "/Ecomerce", element: <Ecomerce />, exact: true },
  { path: "/PremierLeague", element: <Premier />, exact: true },
  { path: "/ChatBot", element: <ChatBot />, exact: true },
  { path: "/To-Do-List", element: <Working />, exact: true },
];

export default routes;
