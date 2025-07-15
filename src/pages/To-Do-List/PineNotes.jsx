import React, { useState, useRef, useEffect } from "react"; // Importa useRef
import { AnimatePresence, motion } from "framer-motion"; // Importa motion de framer-motion
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { io } from "socket.io-client";

function PineNotes() {
  const [notes, setNotes] = useState([]);
  const containerRef = useRef(null); // Ref para el contenedor principal, crucial para 'bounds'
  const socketRef = useRef(null);

  useEffect(() => {
    // Inicializar conexión socket
    const socket = io(import.meta.env.VITE_BACKEND_URL);
    socketRef.current = socket;

    // Recibir notas iniciales
    socket.on("initial-notes", (initialNotes) => {
      setNotes(initialNotes);
    });

    // Nota creada en tiempo real
    socket.on("note-created", (newNote) => {
      setNotes((prevNotes) => [...prevNotes, newNote]);
    });

    // Nota actualizada en tiempo real
    socket.on("note-updated", (updatedNote) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
      );
    });

    // Nota eliminada en tiempo real
    socket.on("note-deleted", (deletedId) => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== deletedId));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
    const newNote = {
      id: Date.now(),
      text: "", // Texto inicial vacío
      x: Math.random() * 250 + 50, // Mejorar la posición inicial aleatoria
      y: Math.random() * 200 + 50, // Mejorar la posición inicial aleatoria
      color: randomColor, // Almacena el valor HEX del color
      // Agregamos una rotación inicial para que ya parezcan "colgadas"
      initialRotate: Math.random() * 8 - 4, // Entre -4 y 4 grados
    };

    socketRef.current.emit("create-note", newNote);
  };

  const DeleteNote = (id) => {
    console.log(`Eliminando nota con ID: ${id}`);
    socketRef.current.emit("delete-note", id);
    console.log("Notas actualizadas:", notes);
  };

  const handleTextChange = (id, newText) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, text: newText } : note))
    );
  };

  const handleDragEnd = (event, info, id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === id) {
          const updatedNote = {
            ...note,
            x: note.x + info.offset.x,
            y: note.y + info.offset.y,
          };

          socketRef.current.emit("update-note", updatedNote);
          return updatedNote;
        }
        return note;
      })
    );
  };

  return (
    // Asigna el ref al contenedor principal
    <div
      ref={containerRef}
      className="w-screen h-screen bg-[url('/fondo/NoteBackground.png')] bg-cover relative overflow-hidden"
    >
      <div className="flex justify-center h-20 items-center">
        <button
          onClick={addNote}
          className="absolute top-6 left-6 p-4 bg-[#ff9696] text-gray-800 rounded-lg shadow-xl
             transform -rotate-3 transition-all duration-150 ease-out
             hover:scale-105 hover:shadow-2xl active:scale-95 active:shadow-lg
             flex items-center justify-center font-black tracking-wide gap-2" // Añade gap-2 aquí
        >
          <PlusCircleIcon className="h-6 w-6" />{" "}
          {/* No necesitas un div extra alrededor del icono */}
          <div>Añadir Nota</div>
        </button>
      </div>
      <AnimatePresence>
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
              cursor: "grabbing", // Cambia el cursor
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)", // Más suave y difusa
            }}
            // onDragEnd se usa para guardar la posición final
            onDragEnd={(event, info) => handleDragEnd(event, info, note.id)}
            initial={{ opacity: 0, scale: 0.8, rotate: note.initialRotate }} // Empieza pequeña y transparente
            exit={{
              opacity: 0,
              y: 500, // Caída más larga
              rotate: 45, // Gira mientras cae
              transition: {
                duration: 0.8, // Un poco más rápido
                ease: "easeIn", // Aceleración hacia abajo
              },
            }}
            animate={{ opacity: 1, scale: 1, rotate: note.initialRotate }} // Crece a su tamaño normal
            transition={{ type: "spring", damping: 10, stiffness: 100 }} // Transición elástica
            // Posición inicial y estado de la nota
            style={{
              backgroundColor: note.color,
              position: "absolute",
              width: "200px",
              height: "150px",
              borderRadius: "8px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)", // Más suave y difusa
              color: "#333",
              padding: "20px",
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
              className="w-full h-full resize-none bg-transparent outline-none text-gray-800 text-base font-medium p-2"
              value={note.text}
              style={{ lineHeight: "1.5" }} // Mejor legibilidad
            ></textarea>
            <button
              onClick={() => DeleteNote(note.id)}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-600 rounded-full shadow-md z-10 -translate-y-1/2"
            ></button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default PineNotes;
