import Inicio from "./pages/inicio/inicio";
import Ecomerce from "./pages/E-comerce/Ecomerce";

const routes = [
  { path: "/", element: <Inicio />, exact: true },
  { path: "/E-comerce", element: <Ecomerce />, exact: true },
  { path: "/PremierLeague", element: <Ecomerce />, exact: true },
];

export default routes;
