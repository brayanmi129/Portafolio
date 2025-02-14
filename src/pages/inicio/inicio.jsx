import "./Inicio.css";
import Navbar from "./components/Navbar.jsx";
import Card from "./components/Card.jsx";
import Grid from "./components/Grid.jsx";
import Footer from "./components/Footer.jsx";
import { useState } from "react";

function Inicio() {
  const [isToggled, setIsToggled] = useState(false);

  const toggleState = () => {
    setIsToggled((prev) => !prev);
  };
  return (
    <>
      {/* Barra de navegación */}
      <Navbar toggle={toggleState} />

      {/* Contenido principal */}

      <Card isToggled={isToggled} toggle={toggleState} />
      <Grid />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Inicio;
