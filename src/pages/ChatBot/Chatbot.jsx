import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { SendHorizonal } from "lucide-react"; // Importar icono de Lucide React

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para el indicador de carga
  const messagesEndRef = useRef(null);

  // URL del backend (usar un placeholder si no está definido en el entorno)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  // Auto-scroll al final del chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Cargar mensajes iniciales al montar el componente
  useEffect(() => {
    //crear id unico si no existe en el localStorage
    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", Date.now());
    }
    const loadMessages = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/ia/historial`, {
          params: { userId: localStorage.getItem("userId") }, // Usar el ID de usuario del localStorage
        });
        // ✅ Asegurarse de que response.data sea un array, si no, usar un array vacío
        setMessages(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("❌ Error al obtener mensajes:", error);
        // En caso de error, inicializar con un mensaje de bienvenida o vacío
        setMessages([]);
      }
    };
    loadMessages();
  }, [BACKEND_URL]);

  // Función para enviar mensajes
  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    const userMessage = { role: "user", parts: [{ text: inputText }] };
    // ✅ Asegurarse de que prevMessages sea un array antes de añadir el mensaje del usuario
    setMessages((prevMessages) => [
      ...(Array.isArray(prevMessages) ? prevMessages : []),
      userMessage,
    ]);
    setInputText(""); // Limpiar el input

    setIsLoading(true); // Activar el indicador de carga

    try {
      const response = await axios.post(`${BACKEND_URL}/api/ia/chat`, {
        userId: localStorage.getItem("userId"), // Usar el ID de usuario del localStorage
        message: userMessage.parts[0].text, // Enviar solo el texto del mensaje
      });

      // ✅ Asegurarse de que response.data sea un array, si no, usar un array vacío
      // Asumiendo que la respuesta del backend es el historial completo
      setMessages(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("❌ Error al enviar mensaje:", error);
      // ✅ Asegurarse de que prevMessages sea un array antes de añadir el mensaje de error
      setMessages((prevMessages) => [
        ...(Array.isArray(prevMessages) ? prevMessages : []),
        {
          role: "model",
          parts: [
            {
              text: "Lo siento, hubo un error al procesar tu solicitud. Por favor, verifica la conexión con el servidor.",
            },
          ],
        },
      ]);
    } finally {
      setIsLoading(false); // Desactivar el indicador de carga
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Permite saltos de línea con Shift + Enter
      e.preventDefault(); // Evita el comportamiento por defecto de Enter (nueva línea)
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-inter antialiased">
      {/* Encabezado del Chatbot */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-4 shadow-lg flex items-center justify-center rounded-b-xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Chat con <span className="text-purple-200">IA</span>
        </h1>
      </header>

      {/* Contenedor principal del chat */}
      <main className="flex-1 flex flex-col p-4 overflow-hidden">
        {/* Área de mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white rounded-lg shadow-inner mb-4 custom-scrollbar">
          {messages && messages.length > 0 ? (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-xl shadow-md text-gray-800 ${
                    message.role === "user"
                      ? "bg-blue-200 rounded-br-none"
                      : "bg-gray-200 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.parts[0].text}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-lg">
              <p>👋 Hola, ¡empieza a interactuar con el chat de IA!</p>
            </div>
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[70%] p-3 rounded-xl shadow-md bg-gray-200 rounded-bl-none">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} /> {/* Para el auto-scroll */}
        </div>

        {/* Área de entrada de texto */}
        <div className="flex items-center p-3 bg-white rounded-lg shadow-lg border border-gray-200">
          <textarea
            className="flex-1 resize-none outline-none border-none p-2 text-gray-800 text-base rounded-md focus:ring-2 focus:ring-blue-400 transition-all duration-200 custom-scrollbar-thin"
            placeholder="Escribe tu mensaje aquí..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1} // Inicia con una fila
            style={{ minHeight: "40px", maxHeight: "120px" }} // Altura mínima y máxima
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || inputText.trim() === ""}
            className="ml-3 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SendHorizonal size={20} />
          </button>
        </div>
      </main>

      {/* Estilos personalizados para el scrollbar (Tailwind no lo hace por defecto) */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        .custom-scrollbar-thin::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar-thin::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 3px;
        }
        .custom-scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #999;
        }
      `}</style>
    </div>
  );
}

export default ChatBot;
