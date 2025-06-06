// components/Header.jsx
import React from "react";

function Header() {
  return (
    <header className="bg-white bg-opacity-70 backdrop-blur-sm shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo/Site Title */}
        <div className="text-3xl font-serif text-[#7B5283] font-bold tracking-wider">
          Lefay Baauty
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="#"
                className="text-[#7B5283] hover:text-[#D4B4DB] text-lg font-medium transition duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#7B5283] hover:text-[#D4B4DB] text-lg font-medium transition duration-300"
              >
                Comprar
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#7B5283] hover:text-[#D4B4DB] text-lg font-medium transition duration-300"
              >
                Catalogo
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#7B5283] hover:text-[#D4B4DB] text-lg font-medium transition duration-300"
              >
                Sobre nosotros
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#7B5283] hover:text-[#D4B4DB] text-lg font-medium transition duration-300"
              >
                Contactos
              </a>
            </li>
          </ul>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <button className="text-[#7B5283] hover:text-[#D4B4DB] text-lg">
            {/* User Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
          <button className="text-[#7B5283] hover:text-[#D4B4DB] text-lg relative">
            {/* Shopping Bag Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {/* <span className="absolute -top-1 -right-1 bg-[#F7CAC9] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span> */}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
