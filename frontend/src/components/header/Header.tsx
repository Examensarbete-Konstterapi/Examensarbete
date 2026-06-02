import { NavLink } from "react-router-dom";
import { useState } from "react";
import Modal from "../modal/Modal";
import Login from "../../pages/login/Login";
import "./header.css";

export default function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  return (
    <header className="header">
      <NavLink to="/">LOGGA</NavLink>
      <nav>
        <NavLink to="/om-mig">Om mig</NavLink>
        <NavLink to="/konstterapi">Konstterapi</NavLink>
        <NavLink to="/boka-tid">Boka tid</NavLink>
        <NavLink to="/galleri">Galleri</NavLink>
        <NavLink to="/priser">Priser</NavLink>
        <NavLink to="/kontakt">Kontakt</NavLink>
        {/* <NavLink to="/logga-in">Logga in</NavLink> */}
        <button onClick={() => setLoginOpen(true)}>
          <svg
            width="3rem"
            height="3rem"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            stroke-width="3.2"
            stroke="#f4e8e1"
            fill="none"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <circle cx="32" cy="18.14" r="11.14"></circle>
              <path d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z"></path>
            </g>
          </svg>
        </button>

        <Modal isOpen={loginOpen} onClose={() => setLoginOpen(false)}>
          <Login />
        </Modal>
      </nav>
    </header>
  );
}
