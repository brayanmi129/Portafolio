import "./Css/Footer.css";
import React, { useState, useEffect } from "react";
import GitHubLogo from "../../../assets/github02.svg";
import LinkedinLogo from "../../../assets/LinkedinLogo.webp";
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
    <footer id="Contacto" className="footer">
      <div className="contacto-item">
        {isMobile ? "" : <p>brayanmiranda129@gmail.com</p>}
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=brayanmiranda129@gmail.com"
          target="_blank"
        >
          <img src={GmailLogo} alt="asdsd" />
        </a>
      </div>
      <div className="contacto-item">
        {isMobile ? "" : <p> Cel: 3188975553</p>}
        <a href="https://api.whatsapp.com/send?phone=573188975553" target="_blank">
          <img src={wha} alt="asdasd" />
        </a>
      </div>

      <div className="contacto-item">
        {isMobile ? "" : <p>Linkedin: Brayan Miranda</p>}
        <a href="https://www.linkedin.com/in/brayan-camilo-miranda-229620253/" target="_blank">
          <img className="imglinkedin" src={LinkedinLogo} alt="hola" />
        </a>
      </div>
      <div className="contacto-item">
        {isMobile ? "" : <p>Github/brayanmi129</p>}
        <a href="https://github.com/brayanmi129" target="_blank">
          <img src={GitHubLogo} alt="hola" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
