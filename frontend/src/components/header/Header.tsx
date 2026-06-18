import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import "./header.css";
// import RegularButton from "../buttons/regularButton/RegularButton";
import { useAuth } from "../../context/useAuth";
import useCheckIfMobile from "../../hooks/useCheckIfMobile";
import ProfileDropdown from "../profileDropdown/ProfileDropdown";
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [modalType, setModalType] = useState<"login" | "register" | null>(null);
  const { user } = useAuth();
  const isMobile = useCheckIfMobile();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <NavLink to="/">Jessickas konstterapi</NavLink>
      {!isMobile && (
        <nav className="desktop-nav">
          <NavLink to="/om-mig">Om mig</NavLink>
          <NavLink to="/konstterapi">Konstterapi</NavLink>
          <NavLink to="/boka-tid">Boka tid</NavLink>
          <NavLink to="/galleri">Galleri</NavLink>
          {/* <NavLink to="/priser">Priser</NavLink> */}
          {/* <NavLink to="/kontakt">Kontakt</NavLink> */}

          {user ? (
            <ProfileDropdown
              name={`${user.firstName} ${user.lastName}`}
              email={user.email}
            />
          ) : (
            <button onClick={() => setModalType("login")}>
              <svg
                width="3rem"
                height="3rem"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth="3.2"
                stroke="#597059"
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
          )}
        </nav>
      )}

      {/* MOBILE HAMBURGER */}
      {isMobile && <HamburgerMenu />}

      <Modal isOpen={modalType !== null} onClose={() => setModalType(null)}>
        {modalType === "login" && (
          <Login
            onSwitchToRegister={() => setModalType("register")}
            onClose={() => setModalType(null)}
          />
        )}
        {modalType === "register" && (
          <Register
            onSwitchToLogin={() => setModalType("login")}
            onClose={() => setModalType(null)}
          />
        )}
      </Modal>
    </header>
  );
}
