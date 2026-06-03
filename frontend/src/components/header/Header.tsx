import { NavLink } from "react-router-dom";
import { useState } from "react";
import Modal from "../modal/Modal";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import "./header.css";

export default function Header() {
  const [modalType, setModalType] = useState<"login" | "register" | null>(null);
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
        <button onClick={() => setModalType("login")}>
          <svg
            width="3rem"
            height="3rem"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth="3.2"
            stroke="#f4e8e1"
            fill="none"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <circle cx="32" cy="18.14" r="11.14"></circle>
              <path d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z"></path>
            </g>
          </svg>
        </button>

        <Modal isOpen={modalType !== null} onClose={() => setModalType(null)}>
          {modalType === "login" && (
            <Login onSwitchToRegister={() => setModalType("register")}/>
          )}
          {modalType === "register" && (
            <Register onSwitchToLogin={() => setModalType("login")} />
          )}
        </Modal>
      </nav>
    </header>
  );
}
