import React, { useState } from "react";
import "./Css/Card.css";
import ReactLogo from "../../../assets/ReactLogo.webp";
import AzureLogo from "../../../assets/AzureLogo.png";
import NodeLogo from "../../../assets/NodeLogo.png";
import DockerLogo from "../../../assets/DockerLogo.webp";
import FirebaseLogo from "../../../assets/FirebaseLogo.png";
import GitHubLogo from "../../../assets/GithubLogo.png";
import LinkedinLogo from "../../../assets/LinkedinLogo.webp";

function Card({ isToggled, toggle }) {
  return (
    <div id="home" className="card-container" onClick={toggle}>
      <div className={`card ${isToggled ? "flipped" : ""}`}>
        {/* Cara frontal */}
        <div className="card-front">
          <div className="card-top">
            <h2> Brayan Camilo Miranda Hernandez</h2>
            <h3>Ingeniero en sistemas</h3>
          </div>
          <div className="card-middle">
            <p>
              Estudiante de Ingeniería en Sistemas con experiencia en desarrollo
              web y administración de infraestructura en la nube. Domino
              tecnologías como Azure (App Services, SQL Servers, Storage,
              Contenedores), Google Firebase (Hosting, Functions, Databases),
              Windows IIS y Docker (contenedores e imágenes). Habilidades en
              desarrollo Front con: HTML, CSS, JavaScript, React Backend con
              Node.js y Express Competente en control de versiones con Git y en
              documentación técnica. Destaco por mi capacidad de liderazgo,
              trabajo en equipo, organización y enfoque en soluciones escalables
              y de calidad{" "}
            </p>
          </div>
          <div className="card-bottom">
            <h2>Conocimientos</h2>
          </div>
          <div className="card-images">
            <ul>
              <li>
                {" "}
                <img className="logo" src={ReactLogo} alt="Logo React" />
              </li>
              <li>
                <img className="logo" src={AzureLogo} alt="Logo Azure" />
              </li>
              <li>
                <img className="logo" src={NodeLogo} alt="Logo NodeJs" />
              </li>
              <li>
                <img className="logo" src={FirebaseLogo} alt="Logo Firebase" />
              </li>
              <li>
                <img className="logo" src={DockerLogo} alt="Logo Docker" />
              </li>
            </ul>
          </div>
        </div>

        {/* Cara trasera */}
        <div className={`card-back`}>
          <div className="card-seccion01">
            <div className="card-experience">
              <h2>Experiencia</h2>
              <div className="ex">
                <h3> Consultor en área implementación Core </h3>
                <h3>Nae Colombia 01/02/2021 - 30/11/2021</h3>
                <p>
                  Atender solicitud del cliente en implementación de cableados,
                  instalación o renovación de equipos activos de manera remota
                  en BTS ,CCM o EB de Claro Colombia Inspección de calidad en
                  equipos y cableados instalados
                </p>
              </div>
              <div className="ex">
                <h3> Analista de Despliegues </h3>
                <h3>Teleperfromance Colombia 07/03/2023 - Actualidad</h3>
                <p>
                  {" "}
                  Apoyo en desarrollo de proyectos Web con Node, servidores
                  Windows y Servicios en la nube de Azure (appservices, DBSQL,
                  Storage Account y VM), Google (Firebase Hosting, Storage y
                  application Functions), encargado de despliegues a productivo
                  uso de Docker, Seguimiento de proyectos, infraestructura de
                  aplicaciónes Web
                </p>
              </div>
            </div>
          </div>
          <div className="card-seccion02">
            <div className="card-seccionv2">
              <p>Linkedin</p>
              <a
                href="https://www.linkedin.com/in/brayan-camilo-miranda-229620253/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="logo" src={LinkedinLogo} alt="Logo Linkedin" />
              </a>
            </div>
            <div className="card-seccionv2">
              <p>Git Hub</p>
              <a
                href="https://github.com/brayanmi129"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="logo" src={GitHubLogo} alt="Logo GitHub" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
