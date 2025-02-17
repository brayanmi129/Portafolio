import "./Css/Footer.css";
import React, { useState } from "react";
import GitHubLogo from "../../../assets/github02.svg";
import LinkedinLogo from "../../../assets/LinkedinLogo.webp";
import GmailLogo from "../../../assets/gmail.svg";
import wha from "../../../assets/wha.svg";

function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
  return (
    <footer id="Contacto" className="footer">
      <div className="contacto-item">
        {isMobile ? "" : <p>brayanmiranda129@gmail.com</p>}

        <img src={GmailLogo} alt="asdsd" />
      </div>
      <div className="contacto-item">
        {isMobile ? "" : <p> Cel: 3188975553</p>}
        <img src={wha} alt="asdasd" />
      </div>

      <div className="contacto-item">
        {isMobile ? "" : <p>Linkedin: Brayan Miranda</p>}

        <img className="imglinkedin" src={LinkedinLogo} alt="hola" />
      </div>
      <div className="contacto-item">
        {isMobile ? "" : <p>Github</p>}
        <img src={GitHubLogo} alt="hola" />
      </div>
    </footer>
  );
}

export default Footer;
