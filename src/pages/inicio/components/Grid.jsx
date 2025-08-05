import React, { useState } from "react";
import "./Css/Grid.css";

function Grid() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const cambiarOpacidad = (index) => {
    setHoveredIndex(index);
  };

  const restaurarOpacidad = () => {
    setHoveredIndex(null);
  };

  const images = Array.from({ length: 3 }, (_, index) => `/fondo/img0${index + 1}.jpeg`);

  // const proyectos = ["chatbot", "Pinned Notes", "Lefay", "Premier League Simulator"];
  // const links = ["/ChatBot", "/Pinned-notes", "/Lefay", "/PremierLeague"];
  const proyectos = ["Chat-Bot", "Pinned Notes", "Crypto Tracker"];
  const links = ["/ChatBot", "/Pinned-notes", "/https://cryptoinvestment.azurewebsites.net"];

  return (
    <div className="grid-container">
      {images.map((image, index) => (
        <a key={index} className="a-items" href={`${links[index]}`}>
          <div
            key={index}
            className={`grid-item item-${index + 1}`}
            style={{
              opacity: hoveredIndex === index ? 1 : 0.65,
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
            }}
            onMouseEnter={() => cambiarOpacidad(index)}
            onMouseLeave={restaurarOpacidad}
          >
            <p> {proyectos[index]} </p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default Grid;
