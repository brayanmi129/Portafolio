import React from "react";
import "./Navbar.css"; // Opcional: Archivo para estilos

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Mi portafolio</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <a href="#home">Inicio</a>
        </li>
        <li>
          <a href="#proyectos">Proyectos</a>
        </li>
        <li>
          <a href="#contact">Contacto</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
