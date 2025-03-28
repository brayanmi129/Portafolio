import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes.jsx";

import DynamicRoot from "./components/DynamicRoot";

function App() {
  return (
    <>
      <Router>
        <DynamicRoot />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </>
  );
}

export default App;
