import React, { useState, useRef } from "react"; // Importa useRef
import { motion } from "framer-motion"; // Importa motion de framer-motion
import { PlusCircleIcon } from "@heroicons/react/24/outline";

function PineNotes() {
  const [notes, setNotes] = useState([]);
  const containerRef = useRef(null); // Ref para el contenedor principal, crucial para 'bounds'

  const addNote = () => {
    console.log("Añadiendo nueva nota...");
    const colors = [
      "#FFDDC1", // Melocotón claro
      "#CCE2FE", // Azul cielo claro
      "#D4EDDA", // Verde menta
      "#FFF8DC", // Crema
      "#E6D7FF", // Lavanda
      "#FFCCCC", // Rosa claro
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setNotes((prevNotes) => [
      ...prevNotes,
      {
        id: Date.now(),
        text: "", // Texto inicial vacío
        x: Math.random() * 250 + 50, // Mejorar la posición inicial aleatoria
        y: Math.random() * 200 + 50, // Mejorar la posición inicial aleatoria
        color: randomColor, // Almacena el valor HEX del color
        // Agregamos una rotación inicial para que ya parezcan "colgadas"
        initialRotate: Math.random() * 8 - 4, // Entre -4 y 4 grados
      },
    ]);
    console.log(notes);
  };

  const handleTextChange = (id, newText) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, text: newText } : note))
    );
  };

  // En Framer Motion, la posición se actualiza automáticamente,
  // pero aún necesitamos guardarla si queremos persistencia.
  const handleDragEnd = (event, info, id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, x: info.point.x, y: info.point.y } : note
      )
    );
    console.log(`Nota ${id} movida a posición: (${info.point.x}, ${info.point.y})`);
    // Aquí puedes guardar en la DB si lo deseas
  };

  return (
    // Asigna el ref al contenedor principal
    <div
      ref={containerRef}
      className="w-screen h-screen bg-[url('/fondo/NoteBackground.png')] bg-cover relative"
    >
      <div className="flex justify-center h-20 items-center">
        <button
          onClick={addNote}
          className="absolute top-6 left-6 p-4 bg-[#ff9696] text-gray-800 rounded-lg shadow-xl 
                     transform -rotate-3 transition-all duration-150 ease-out 
                     hover:scale-105 hover:shadow-2xl active:scale-95 active:shadow-lg
                     flex items-center justify-center font-black tracking-wide"
        >
          <div>
            <PlusCircleIcon className="h-6 w-6 mr-2" />
          </div>{" "}
          <div>Añadir Nota</div>
        </button>
      </div>

      {notes.map((note, index) => (
        <motion.div // Usamos motion.div en lugar de Draggable
          key={note.id}
          // Propiedades de arrastre de Framer Motion
          drag
          dragConstraints={containerRef}
          dragMomentum={false}
          whileTap={{
            rotate: [0, 8, -8, 8, -8, 0],
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
          // onDragEnd se usa para guardar la posición final
          onDragEnd={(event, info) => handleDragEnd(event, info, note.id)}
          // Posición inicial y estado de la nota
          style={{
            backgroundColor: note.color,
            position: "absolute",
            width: "200px",
            height: "150px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            color: "#333",
            padding: "10px",
            // border: "2px solid black", // Puedes activar esto si quieres un borde visible
            x: note.x, // Framer Motion usa 'x' y 'y' en 'style' para su control
            y: note.y,
            zIndex: index + 1, // Asegura que la nota arrastrada quede encima
            // Ajustamos el 'transformOrigin' para simular que cuelga de la parte superior
            transformOrigin: "50% 0%", // Esto hace que la rotación pivote desde el centro superior
            rotate: note.initialRotate, // Aplica la rotación inicial
          }}
          className="note" // Si usas esta clase 'note', asegúrate de definirla en tu CSS
        >
          <textarea
            onChange={(e) => handleTextChange(note.id, e.target.value)}
            placeholder="Escribe tu nota aquí..."
            className="w-full h-full resize-none bg-transparent outline-none"
            value={note.text}
          ></textarea>
        </motion.div>
      ))}
    </div>
  );
}

export default PineNotes;
