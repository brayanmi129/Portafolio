import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function DynamicRoot() {
  const location = useLocation();

  useEffect(() => {
    const root = document.getElementById("root");

    // Resetear clases
    root.className = "";

    // Agregar clases según la ruta
    if (location.pathname.startsWith("/ChatBot")) {
      root.classList.add("ChatBot");
    } else if (location.pathname.startsWith("/PremierLeague")) {
      root.classList.add("PremierLeague-theme");
    } else if (location.pathname.startsWith("/Lefay")) {
      root.classList.add("Lefay-theme");
    } else if (location.pathname.startsWith("/To-Do-List")) {
      root.classList.add("To-Do-List-theme");
    } else {
      root.classList.add("Inicio-theme");
    }
  }, [location]);

  return null; // Solo afecta al <div id="root">
}

export default DynamicRoot;
