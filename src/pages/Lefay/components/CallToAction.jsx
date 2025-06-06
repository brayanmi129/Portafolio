// components/CallToAction.jsx
import React from "react";

function CallToAction() {
  return (
    <section className="bg-gradient-to-r from-[#D4B4DB] to-[#F7CAC9] rounded-lg shadow-xl p-10 text-center my-12">
      <h2 className="text-4xl font-serif text-[#7B5283] mb-4">
        Únete a nuestro panteón de belleza
      </h2>
      <p className="text-xl text-white mb-6">
        Registrate para poder comprar y recibir las últimas novedades, ofertas
      </p>
      <form className="flex justify-center items-center gap-4">
        <input
          type="email"
          placeholder="Ingresa correo electrónico"
          className="p-3 rounded-full border-2 border-white focus:outline-none focus:border-[#B5EAD7] w-full max-w-md text-lg placeholder-gray-500"
        />
        <button className="bg-[#7B5283] hover:bg-[#5A3F6B] text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105">
          Registrate
        </button>
      </form>
    </section>
  );
}

export default CallToAction;
