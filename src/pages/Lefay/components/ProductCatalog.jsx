// components/ProductCatalog.jsx
import React from "react";
//asd
const products = [
  {
    id: 1,
    name: "SHAMPOO LECHE PAL PELO TRADICIONAL",
    price: "28.00",
    image: "https://lefaymakeup.my.canva.site/_assets/media/b6397d8a300ee927b787e9d31d2599c5.png",
  },
  {
    id: 2,
    name: "Nectar of the Gods Lipstick",
    price: "32.00",
    image: "./fondo/producto.png",
  },
  {
    id: 3,
    name: "Celestial Eyeshadow Palette",
    price: "45.00",
    image: "./fondo/producto.png",
  },
  {
    id: 4,
    name: "Aurora Glow Highlighter",
    price: "30.00",
    image: "./fondo/producto.png",
  },
  {
    id: 5,
    name: "Olympus Foundation",
    price: "38.00",
    image: "./fondo/producto.png",
  },
  {
    id: 6,
    name: "Siren's Kiss Lip Gloss",
    price: "25.00",
    image: "./fondo/producto.png",
  },
];

function ProductCatalog() {
  return (
    <section className="mb-12">
      <h2 className="text-5xl font-serif text-[#7B5283] text-center mb-10 pb-4 relative">
        Nuestros productos
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F7CAC9] rounded-full"></span>
      </h2>

      {/* Product Filters/Categories (Optional but recommended) */}
      <div className="flex justify-center space-x-6 mb-8 text-lg">
        <button className="text-[#7B5283] hover:text-[#D4B4DB] font-semibold pb-1 border-b-2 border-transparent hover:border-[#D4B4DB] transition duration-300">
          All
        </button>
        <button className="text-[#7B5283] hover:text-[#D4B4DB] font-semibold pb-1 border-b-2 border-transparent hover:border-[#D4B4DB] transition duration-300">
          Cuidado corporal
        </button>
        <button className="text-[#7B5283] hover:text-[#D4B4DB] font-semibold pb-1 border-b-2 border-transparent hover:border-[#D4B4DB] transition duration-300">
          Cuidado Facial
        </button>
        <button className="text-[#7B5283] hover:text-[#D4B4DB] font-semibold pb-1 border-b-2 border-transparent hover:border-[#D4B4DB] transition duration-300">
          Cuidado Capilar
        </button>
        <button className="text-[#7B5283] hover:text-[#D4B4DB] font-semibold pb-1 border-b-2 border-transparent hover:border-[#D4B4DB] transition duration-300">
          Maquillaje
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain p-2"
            />
            <div className="p-5 text-center">
              <h3 className="text-xl font-semibold text-[#7B5283] mb-2 font-serif">
                {product.name}
              </h3>
              <p className="text-lg text-[#D4B4DB] mb-4">${product.price}</p>
              <button className="bg-[#B5EAD7] hover:bg-[#F7CAC9] text-[#7B5283] font-bold py-2 px-6 rounded-full text-md transition duration-300">
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductCatalog;
