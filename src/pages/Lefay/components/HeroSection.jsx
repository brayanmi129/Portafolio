// components/HeroSection.jsx
import React from "react";

function HeroSection() {
  return (
    <section
      className="relative h-[60vh] bg-cover bg-center rounded-lg shadow-xl overflow-hidden mb-12"
      style={{
        // La ruta ahora es relativa a la carpeta 'public'
        backgroundImage: `url("/fondo/cielo.jpg")`,
      }}
    >
      <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center p-8">
        <div className="text-center text-black">
          <h1 className="text-6xl font-serif text-black mb-4 drop-shadow-lg">
            Hecho en el cielo, creado para ti.
          </h1>
          <p className="text-2xl font-light text-black mb-1">!Me encanta que estés aquí!</p>{" "}
          <p className="text-2xl font-light text-black mb-10">
            Desde el momento en que entras, este espacio es tuyo. un lugar donde la belleza no tiene
            reglas, solo posibilidades. Aquí encontrarás más que productos: Descubrirás pequeños
            rituales para cuidar tu piel, realzar tu esencia y sentirte increíble cada día. Porque
            la belleza no es solo lo que vemos, Sino lo que sentimos.
          </p>
          <button className="bg-[#F7CAC9] hover:bg-[#D4B4DB] text-[#7B5283] font-bold py-3 px-8 rounded-full text-xl shadow-lg transition duration-300 transform hover:scale-105">
            Comprar ahora
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
