import { useEffect, useState, useRef } from "react";
import "./css/conversation.css";
import axios from "axios";

const GetMessages = async (userId) => {
  try {
    const response = await axios.get("http://localhost:3000/historial", {
      params: { userId: userId },
    });
    console.log("✅ Datos obtenidos", response.data);
    return response.data;
  } catch (e) {
    console.log("Error al obtener mensajes", e);
  }
};

const SendMessage = async (mensaje) => {
  try {
    const response = await axios.post("http://localhost:3000/chat", {
      userId: 2,
      message: mensaje, // 🔹 Envía el mensaje del input
    });
    console.log("✅ Datos obtenidos", response.data);

    return response.data; // 🔹 Devolver los datos de la respuesta
  } catch (error) {
    console.error("❌ Error al obtener datos", error);
    return []; // 🔹 Retornar un array vacío en caso de error
  }
};

function Conversation() {
  const [messages, setMessages] = useState([]); // 🔹 Cambiado el estado
  const [texto, setTexto] = useState(""); // Estado para almacenar el texto
  const messagesEndRef = useRef(null); // 🔹 Referencia al final del chat

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const loadMessages = async () => {
      const resultado = await GetMessages("2");
      setMessages(resultado);
    };
    loadMessages();
  }, []);

  const handleEnviar = async () => {
    if (texto.trim() === "") return; // 🔹 Evita enviar mensajes vacíos
    const resultado = await SendMessage(texto); // 🔹 Envía el mensaje escrito
    setMessages(resultado);
    setTexto(""); // 🔹 Limpia el input después de enviar
  };

  return (
    <div className="conversation">
      <div className="messages">
        {messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={index} className={message.role}>
              <div className="message-text">{message.parts[0].text}</div>
            </div>
          ))
        ) : (
          <p>Hola Empieza a interactuar con el chat de Gemini</p>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="inputs">
        <input
          type="text"
          placeholder="Escribe aquí"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />

        <button onClick={handleEnviar}>Enviar </button>
      </div>
    </div>
  );
}

export default function App() {
  return <Conversation />;
}
