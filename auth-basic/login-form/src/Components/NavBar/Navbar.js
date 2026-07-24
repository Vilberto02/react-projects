import React from "react";
import "./Navbar.css";
import logo from "../Assets/terrAI.svg";

const NavBar = () => {
  return (
    <header className="container">
      <div className="container-logo">
        <a href="/">
          <img src={logo} alt="Logo Terrai" className="app-logo" />
        </a>
      </div>

      <div className="links">
        <div className="body">
          <a href="/">Inicio</a>
          <a href="/about">Acerca de</a>
          <a href="/contact">Contacto</a>
        </div>

        <div className="monitor">
          <a href="/href-monitor">Monitorear</a>
        </div>
      </div>
      <div className="buttons">
        <a href="/login">Iniciar sesión</a>
        <button type="button">Registrarse</button>
      </div>
    </header>
  );
};

export default NavBar;
