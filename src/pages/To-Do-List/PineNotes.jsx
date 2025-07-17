import React, { useState, useRef, useEffect, useCallback } from "react"; // Añadir useCallback
import { AnimatePresence, motion } from "framer-motion";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { io } from "socket.io-client";
import throttle from "lodash.throttle"; // Importar throttle

function PineNotes() {
  const [notes, setNotes] = useState([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [otherCursors, setOtherCursors] = useState({});
  const containerRef = useRef(null);
  const [isConected, setIsConected] = useState(false);
  const [isDraggingEnabled, setIsDraggingEnabled] = useState(true);

  const socketRef = useRef(null);
  const clientIdRef = useRef(Date.now() + "-" + Math.random());

  // Medir contenedor (sin cambios)
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

  // Socket (sin cambios)
  useEffect(() => {
    const socket = io(import.meta.env.VITE_BACKEND_URL);
    socketRef.current = socket;

    socket.on("initial-notes", (initialNotes) => {
      setNotes(initialNotes);
      setIsConected(true);
    });
    socket.on("note-created", (newNote) => setNotes((prev) => [...prev, newNote]));
    socket.on("note-updated", (updatedNote, clientId) => {
      console.log("Comparing IDs:", clientId, "-----", clientIdRef.current);
      if (clientId === clientIdRef.current) {
        // Ignorar actualización porque ya está en el estado local
        return;
      }
      setNotes((prev) => prev.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
    });
    socket.on("note-deleted", (deletedId) =>
      setNotes((prev) => prev.filter((note) => note.id !== deletedId))
    );
    socket.on("note-dragged", (draggedNote) =>
      setNotes((prev) => prev.map((note) => (note.id === draggedNote.id ? draggedNote : note)))
    );

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!socketRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - containerRect.left) / containerRect.width;
      const y = (e.clientY - containerRect.top) / containerRect.height;
      socketRef.current.emit("mouse-move", { x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [containerRef]);

  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on("mouse-update", ({ clientId, x, y }) => {
      if (clientId === clientIdRef.current) return; // no mostrar mi propio cursor
      setOtherCursors((prev) => ({
        ...prev,
        [clientId]: { x, y },
      }));
    });

    socketRef.current.on("user-disconnected", (clientId) => {
      setOtherCursors((prev) => {
        const updated = { ...prev };
        delete updated[clientId];
        return updated;
      });
    });
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
    const updatedNote = notes.find((note) => note.id === id);
    if (updatedNote) {
      socketRef.current.emit("update-note", { ...updatedNote, text: newText }, clientIdRef.current);
    }
  };

  // --- CAMBIO CLAVE AQUÍ ---
  // Memoizamos la función de emisión de arrastre para que solo se ejecute cada 50ms
  const emitDragUpdate = useCallback(
    throttle((updatedNote) => {
      socketRef.current.emit("drag-note", updatedNote);
    }, 80), // Emite un máximo de una vez cada 50 milisegundos
    []
  );

  const handleDrag = (event, info, id) => {
    if (
      !containerRef.current ||
      !socketRef.current ||
      !containerSize.width ||
      !containerSize.height
    )
      return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newX = (info.point.x - containerRect.left) / containerSize.width;
    const newY = (info.point.y - containerRect.top) / containerSize.height;

    setNotes((prev) =>
      prev.map((note) => {
        if (note.id === id) {
          const updatedNote = {
            ...note,
            x: newX,
            y: newY,
          };
          // Llamar a la función throttle aquí
          emitDragUpdate(updatedNote);
          return updatedNote;
        }
        return note;
      })
    );
  };

  const handleDragEnd = (event, info, id) => {
    if (
      !containerRef.current ||
      !socketRef.current ||
      !containerSize.width ||
      !containerSize.height
    )
      return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newX = (info.point.x - containerRect.left) / containerSize.width;
    const newY = (info.point.y - containerRect.top) / containerSize.height;

    setNotes((prev) =>
      prev.map((note) => {
        if (note.id === id) {
          const updatedNote = {
            ...note,
            x: newX,
            y: newY,
          };
          // Asegúrate de enviar la posición final de inmediato al soltar
          socketRef.current.emit("update-note", updatedNote, clientIdRef.current);
          return updatedNote;
        }
        return note;
      })
    );
    // Limpia cualquier llamada throttled pendiente para asegurar que la última posición se envíe
    emitDragUpdate.flush();
  };
  // --- FIN CAMBIO CLAVE ---

  return (
    <div className="w-screen h-screen bg-[url('/fondo/NoteBackground.png')] bg-cover relative overflow-hidden flex items-center justify-center">
      {Object.entries(otherCursors).map(([clientId, pos]) => (
        <div
          key={clientId}
          className="absolute w-4 h-4 rounded-full bg-red-500 opacity-75 pointer-events-none"
          style={{
            left: `${pos.x * 100}%`,
            top: `${pos.y * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      <div ref={containerRef} style={{ width: "90%", height: "90%", position: "relative" }}>
        {" "}
        <button
          onClick={addNote}
          className="absolute top-6 left-6 p-4 text-gray-800 rounded-lg shadow-xl transform -rotate-3 transition-all duration-150 ease-out hover:scale-105 hover:shadow-2xl active:scale-95 active:shadow-lg flex items-center justify-center font-black tracking-wide gap-2"
          style={{ backgroundColor: "#ff9696" }}
        >
          <PlusCircleIcon className="h-6 w-6" />
          <div>Añadir Nota</div>
        </button>
        <AnimatePresence>
          {notes.map((note, index) => (
            <motion.div
              key={note.id}
              drag={isDraggingEnabled}
              dragConstraints={containerRef}
              dragMomentum={false}
              onDrag={(event, info) => handleDrag(event, info, note.id)}
              onDragEnd={(event, info) => handleDragEnd(event, info, note.id)}
              initial={{ opacity: 0, scale: 0.8, rotate: note.initialRotate }}
              animate={{ opacity: 1, scale: 1, rotate: note.initialRotate }}
              exit={{
                opacity: 0,
                y: 500,
                rotate: 45,
                transition: { duration: 0.8, ease: "easeIn" },
              }}
              transition={{ type: "spring", damping: 10, stiffness: 100 }}
              style={{
                backgroundColor: note.color,
                position: "absolute",
                width: "200px",
                height: "150px",
                borderRadius: "8px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
                color: "#333",
                padding: "20px",
                x: note.x * containerSize.width,
                y: note.y * containerSize.height,
                zIndex: index + 1,
                transformOrigin: "50% 0%",
                rotate: note.initialRotate,
                cursor: isDraggingEnabled ? "grab" : "default",
              }}
            >
              <textarea
                onChange={(e) => handleTextChange(note.id, e.target.value)}
                onPointerDown={() => setIsDraggingEnabled(false)}
                onPointerUp={() => setIsDraggingEnabled(true)}
                onPointerLeave={() => setIsDraggingEnabled(true)}
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
      {!isConected && (
        <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-bold z-50">
          <div className="flex flex-col items-center">
            <div className="mb-4">Conectando...</div>
            <div
              className="
        animate-spin
        rounded-full
        h-16
        w-16
        border-t-4
        border-b-4
        border-blue-500
      "
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PineNotes;
