import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import "./hamburgerMenu.css";

type HamburgerMenuProps = {
  onNavigate?: () => void;
};

export default function HamburgerMenu({ onNavigate }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = () => {
    setIsOpen(false);
    if (onNavigate) onNavigate();
  };

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  return (
    <div className="hamburger-menu" ref={menuRef}>
      <button
        className={`hamburger-button ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Meny"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {isOpen && (
        <nav className="mobile-menu">
          <NavLink to="/" onClick={handleNavClick}>
            Hem
          </NavLink>
          <NavLink to="/om-mig" onClick={handleNavClick}>
            Om mig
          </NavLink>
          <NavLink to="/konstterapi" onClick={handleNavClick}>
            Konstterapi
          </NavLink>
          <NavLink to="/boka-tid" onClick={handleNavClick}>
            Boka tid
          </NavLink>
          <NavLink to="/galleri" onClick={handleNavClick}>
            Galleri
          </NavLink>
          <NavLink to="/priser" onClick={handleNavClick}>
            Priser
          </NavLink>
          <NavLink to="/kontakt" onClick={handleNavClick}>
            Kontakt
          </NavLink>

          {user && (
            <>
              <hr />
              <NavLink to="/mina-sidor" onClick={handleNavClick}>
                Mina sidor
              </NavLink>
              <button onClick={handleLogout} className="mobile-logout-btn">
                Logga ut ({user.firstName})
              </button>
            </>
          )}

          {!user && (
            <>
              <hr />
              <button
                onClick={() => {
                  setIsOpen(false);
                  // Du kan lägga till en prop här för att öppna login-modal
                }}
                className="mobile-login-btn"
              >
                Logga in
              </button>
            </>
          )}
        </nav>
      )}
    </div>
  );
}
