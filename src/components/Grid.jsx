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

  const images = Array.from(
    { length: 4 },
    (_, index) => `../../public/fondo/img0${index + 1}.jpeg`
  );

  const proyectos = ["chatbot", "E-commerce", "Video Juego", "To-Do List"];

  return (
    <div id="proyectos" className="grid-container">
      {images.map((image, index) => (
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
      ))}
    </div>
  );
}

export default Grid;
