// components/Footer.jsx
import React from "react";

function Footer() {
  return (
    <footer className="bg-[#B5EAD7] bg-opacity-70 text-[#7B5283] py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-4 md:mb-0">
          <h3 className="text-2xl font-serif font-bold">Lefay</h3>
          <p className="text-sm mt-2">
            &copy; 2025 Todos los derechos reservados. Inspirado por lo Divino.
          </p>
        </div>

        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="#" className="hover:text-white transition duration-300">
            Politicas de privacidad
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            Terminos del servicio
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            Envíos y devoluciones
          </a>
        </div>

        <div className="flex space-x-4">
          {/* Social Media Icons (replace with actual SVG or icon library) */}
          <a href="#" className="hover:text-white transition duration-300">
            <img src="https://img.icons8.com/ios-filled/24/null/facebook-new.png" alt="Facebook" />
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            <img
              src="https://img.icons8.com/ios-filled/24/null/instagram-new.png"
              alt="Instagram"
            />
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            <img src="https://img.icons8.com/ios-filled/24/null/pinterest.png" alt="Pinterest" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
