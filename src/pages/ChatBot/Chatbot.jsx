import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { SendHorizonal } from "lucide-react";
import { motion } from "framer-motion";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", Date.now() + Math.random().toString(36).substring(2, 9));
    }
    const loadMessages = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/ia/history`, {
          params: { userId: localStorage.getItem("userId") },
        });
        setMessages(Array.isArray(response.data) ? response.data : []);
      } catch {
        setMessages([]);
      }
    };
    loadMessages();
  }, []);

  const sendMessage = async () => {
    if (inputText.trim() === "") return;
    const userMessage = { role: "user", parts: [{ text: inputText }] };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/ia/chat`, {
        userId: localStorage.getItem("userId"),
        message: userMessage.parts[0].text,
        messages,
      });
      setMessages(Array.isArray(response.data) ? response.data : []);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          parts: [{ text: "❌ Error al procesar tu solicitud. Intenta nuevamente." }],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = async () => {
    const response = await axios.post(`${BACKEND_URL}/api/ia/clearChat`, {
      userId: localStorage.getItem("userId"),
    });

    setMessages(Array.isArray(response.data) ? response.data : []);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-inter p-4">
      {/* Chat container */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-4 shadow-lg flex items-center justify-between border rounded-lg">
          <h1 className="text-2xl font-bold"> Chat con Gemini</h1>
          <button
            onClick={clearChat}
            className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition"
          >
            Nueva conversación
          </button>
        </header>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col p-4 overflow-hidden ">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white rounded-lg shadow-inner mb-4 custom-scrollbar">
            {messages && messages.length > 0 ? (
              messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-xl shadow-md text-gray-800 ${
                      message.role === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-200 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.parts[0].text}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 text-lg">
                <p> Hola, envía un mensaje para iniciar la conversación</p>
              </div>
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[70%] p-3 rounded-xl shadow-md bg-gray-200 rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex items-center p-3 bg-white rounded-lg shadow-lg border border-gray-200">
            <textarea
              className="flex-1 resize-none outline-none border-none p-2 text-gray-800 text-base rounded-md focus:ring-2 focus:ring-blue-400 transition-all custom-scrollbar-thin"
              placeholder="Escribe tu mensaje aquí..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1}
              style={{ minHeight: "40px", maxHeight: "120px" }}
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={sendMessage}
              disabled={isLoading || inputText.trim() === ""}
              className="ml-3 p-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:bg-gradient-to-r from-purple-600 to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition disabled:opacity-80 disabled:cursor-not-allowed"
            >
              <SendHorizonal size={20} />
            </motion.button>
          </div>
        </main>
      </div>
      {/* Estilos personalizados para el scrollbar (Tailwind no lo hace por defecto) */}{" "}
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 8px; } .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; } .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; } .custom-scrollbar-thin::-webkit-scrollbar { width: 6px; height: 6px; } .custom-scrollbar-thin::-webkit-scrollbar-track { background: transparent; } .custom-scrollbar-thin::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; } .custom-scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #999; }`}</style>
    </div>
  );
}

export default ChatBot;
