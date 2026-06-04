import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import "./profileDropdown.css";

type ProfileDropdownProps = {
  name: string;
};

export default function ProfileDropdown({ name }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Stäng dropdown när man klickar utanför
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button
        className="profile-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {name}
        <svg
          className={`dropdown-arrow ${isOpen ? "open" : ""}`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <NavLink to="/mina-sidor" onClick={() => setIsOpen(false)}>
            Mina sidor
          </NavLink>
          <button onClick={handleLogout} className="logout-btn">
            Logga ut
          </button>
        </div>
      )}
    </div>
  );
}
