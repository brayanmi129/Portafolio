import "./Inicio.css";
import Navbar from "./components/Navbar.jsx";
import Card from "./components/Card.jsx";
import Grid from "./components/Grid.jsx";
import Footer from "./components/Footer.jsx";
import Separador from "./components/Separador.jsx";
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
      <main
        className="flex-1 pt-[60px] px-4 sm:px-8"
        style={{ backgroundColor: "#242424", color: "rgba(255, 255, 255, 0.87)" }}
      >
        <Card isToggled={isToggled} toggle={toggleState} />
        <Separador />
        <Grid />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Inicio;
