import React, { useState, useEffect } from "react";
import GitHubLogo from "../../../assets/github02.svg";
import LinkedinLogo from "../../../assets/LinkedinLogo.png";
import GmailLogo from "../../../assets/gmail.png";
import wha from "../../../assets/whatsapp.png";

function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer
      id="Contacto"
      className={` flex justify-center items-center w-full text-white 
        ${isMobile ? "px-2 pb-5 pt-0 min-h-24" : "bg-[#333] p-4"}`}
      style={{
        background: isMobile ? "linear-gradient(to bottom, transparent 30%, #333 30%)" : "#333",
        padding: isMobile ? "0% 2% 5% 2%" : "1rem",
        minHeight: isMobile ? "24px" : "auto",
      }}
    >
      {/* Gmail */}
      <div className="w-1/4 flex justify-center items-center">
        {!isMobile && <p className="mx-4">brayanmiranda129@gmail.com</p>}
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=brayanmiranda129@gmail.com"
          target="_blank"
        >
          <img className="w-8" src={GmailLogo} alt="Logo Gmail" />
        </a>
      </div>

      {/* WhatsApp */}
      <div className="w-1/4 flex justify-center items-center">
        {!isMobile && <p className="mx-4">Cel: 3188975553</p>}
        <a href="https://api.whatsapp.com/send?phone=573188975553" target="_blank">
          <img className="w-8" src={wha} alt="logo whatsapp" />
        </a>
      </div>

      {/* LinkedIn */}
      <div className="w-1/4 flex justify-center items-center">
        {!isMobile && <p className="mx-4">Linkedin: Brayan Miranda</p>}
        <a href="https://www.linkedin.com/in/brayan-camilo-miranda-229620253/" target="_blank">
          <img className="w-11" src={LinkedinLogo} alt="Logo linkedin" />
        </a>
      </div>

      {/* GitHub */}
      <div className="w-1/4 flex justify-center items-center">
        {!isMobile && <p className="mx-4">Github/brayanmi129</p>}
        <a href="https://github.com/brayanmi129" target="_blank">
          <img className="w-8" src={GitHubLogo} alt="Logo github" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
