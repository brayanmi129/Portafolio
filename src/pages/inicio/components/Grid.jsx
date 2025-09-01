import { useState } from "react";

function Grid() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const proyectos = [
    {
      nombre: "Chat-Bot",
      link: "/ChatBot",
      image: "/fondo/img01.jpeg",
      tecnologias: ["React", "Node.js", "Gemini IA"],
      summary:
        "Una aplicación para interactuar con un modelo de lenguaje basado en IA para obtener respuestas a preguntas y mantener conversaciones.",
    },
    {
      nombre: "Pinned Notes",
      link: "/Pinned-notes",
      image: "/fondo/img02.jpeg",
      tecnologias: ["React", "Node.js", "WebSocket"],
      summary:
        "Una aplicación tipo tablero de colaboración para dejar notas tipo post-it con integración en tiempo real para interactuar con otras personas.",
    },
    {
      nombre: "Crypto Tracker",
      link: "https://cryptoinvestment.azurewebsites.net",
      image: "/fondo/img03.jpeg",
      summary:
        "Una aplicación para rastrear precios de criptomonedas en tiempo real utilizando la API de CoinMarketCap.",
      tecnologias: ["React", "Node.js", "Consumo de API externa"],
    },
  ];

  return (
    <div className="grid grid-cols-1  gap-12 py-4 px-2 md:px-24">
      {proyectos.map((proyecto, index) => (
        <div
          key={index}
          className="relative group h-72 md:h-64 rounded-2xl shadow-lg overflow-hidden"
          style={{
            backgroundImage: `url(${proyecto.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={() => setSelectedIndex(selectedIndex === index ? null : index)} // móvil
        >
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-center text-white p-4 
              transition-all duration-300
              ${selectedIndex === index ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}
            `}
          >
            <h3 className="text-xl font-bold mb-2">{proyecto.nombre}</h3>
            <p className="text-s mb-2">{proyecto.summary}</p>
            <p className="text-s mb-3">Tecnologias: {proyecto.tecnologias.join(", ")}</p>
            <a
              href={proyecto.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 my-2 rounded-lg text-white"
              style={{ border: "2px solid #00bcd4", borderRadius: "10px", color: "white" }}
            >
              Ver Proyecto
            </a>
          </div>

          <div
            className={`
    absolute bottom-0 w-full bg-black/50 text-white text-center py-2 
    transition-opacity duration-300
    ${selectedIndex === index ? "opacity-0" : "opacity-100 md:group-hover:opacity-0"}
  `}
          >
            {proyecto.nombre}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Grid;
