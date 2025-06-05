import React from "react";
import "./Css/Navbar.css"; // Opcional: Archivo para estilos

function Navbar({ toggle }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/pdf/BrayanMiranda.pdf"; // Ruta relativa desde 'public'
    link.download = "BrayanMiranda.pdf";
    link.click();
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Mi portafolio</h1>
      </div>
      <ul className="navbar-links">
        <li className="liitem">
          <a href="#home">Inicio</a>
        </li>
        <li className="liitem" onClick={toggle}>
          <a href="#home">Experiencia</a>
        </li>
        <li className="liitem">
          <a href="#proyectos">Proyectos</a>
        </li>
        <li className="liitem">
          <a href="#Contacto">Contacto</a>
        </li>
        <li className="hv">
          <a onClick={handleDownload} href="#" title="Descargar hoja de vida (PDF)">
            HV
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
