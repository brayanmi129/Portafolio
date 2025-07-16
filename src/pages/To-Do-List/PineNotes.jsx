import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { io } from "socket.io-client";

function PineNotes() {
  const [notes, setNotes] = useState([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const socketRef = useRef(null);

  // Medir el tamaño del contenedor de forma segura
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_BACKEND_URL);
    socketRef.current = socket;

    socket.on("initial-notes", (initialNotes) => setNotes(initialNotes));
    socket.on("note-created", (newNote) => setNotes((prev) => [...prev, newNote]));
    socket.on("note-updated", (updatedNote) =>
      setNotes((prev) => prev.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
    );
    socket.on("note-deleted", (deletedId) =>
      setNotes((prev) => prev.filter((note) => note.id !== deletedId))
    );

    return () => socket.disconnect();
  }, []);

  const addNote = () => {
    const colors = ["#FFDDC1", "#CCE2FE", "#D4EDDA", "#FFF8DC", "#E6D7FF", "#FFCCCC"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newNote = {
      id: Date.now(),
      text: "",
      x: Math.random() * 0.8 + 0.1,
      y: Math.random() * 0.7 + 0.1,
      color: randomColor,
      initialRotate: Math.random() * 8 - 4,
    };
    socketRef.current.emit("create-note", newNote);
  };

  const DeleteNote = (id) => {
    socketRef.current.emit("delete-note", id);
  };

  const handleTextChange = (id, newText) => {
    setNotes((prev) => prev.map((note) => (note.id === id ? { ...note, text: newText } : note)));
  };

  const handleDragEnd = (event, info, id) => {
    setNotes((prev) =>
      prev.map((note) => {
        if (note.id === id) {
          const updatedNote = {
            ...note,
            x: (note.x * containerSize.width + info.offset.x) / containerSize.width,
            y: (note.y * containerSize.height + info.offset.y) / containerSize.height,
          };
          socketRef.current.emit("update-note", updatedNote);
          return updatedNote;
        }
        return note;
      })
    );
  };

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen bg-[url('/fondo/NoteBackground.png')] bg-cover relative overflow-hidden"
    >
      <div className="flex justify-center h-20 items-center">
        <button
          onClick={addNote}
          className="absolute top-6 left-6 p-4 text-gray-800 rounded-lg shadow-xl transform -rotate-3 transition-all duration-150 ease-out hover:scale-105 hover:shadow-2xl active:scale-95 active:shadow-lg flex items-center justify-center font-black tracking-wide gap-2"
          style={{ backgroundColor: "#ff9696" }}
        >
          <PlusCircleIcon className="h-6 w-6" />
          <div>Añadir Nota</div>
        </button>
      </div>

      <AnimatePresence>
        {notes.map((note, index) => (
          <motion.div
            key={note.id}
            drag
            dragConstraints={containerRef}
            dragMomentum={false}
            whileTap={{
              rotate: [0, 8, -8, 8, -8, 0],
              transition: { duration: 0.6, ease: "easeInOut" },
              cursor: "grabbing",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)",
            }}
            onDragEnd={(event, info) => handleDragEnd(event, info, note.id)}
            initial={{ opacity: 0, scale: 0.8, rotate: note.initialRotate }}
            exit={{
              opacity: 0,
              y: 500,
              rotate: 45,
              transition: { duration: 0.8, ease: "easeIn" },
            }}
            animate={{ opacity: 1, scale: 1, rotate: note.initialRotate }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            style={{
              backgroundColor: note.color,
              position: "absolute",
              width: "200px",
              height: "150px",
              borderRadius: "8px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)",
              color: "#333",
              padding: "20px",
              x: note.x * containerSize.width,
              y: note.y * containerSize.height,
              zIndex: index + 1,
              transformOrigin: "50% 0%",
              rotate: note.initialRotate,
            }}
          >
            <textarea
              onChange={(e) => handleTextChange(note.id, e.target.value)}
              placeholder="Escribe tu nota aquí..."
              className="w-full h-full resize-none bg-transparent outline-none text-gray-800 text-base font-medium p-2"
              value={note.text}
              style={{ lineHeight: "1.5" }}
            ></textarea>
            <button
              onClick={() => DeleteNote(note.id)}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full shadow-md z-10 -translate-y-1/2"
              style={{ backgroundColor: "#4B5563" }}
            ></button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default PineNotes;
