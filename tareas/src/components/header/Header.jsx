import React, { useEffect, useState } from "react";
import "../header/Header.css";
import { logout } from "../../store/actions/userActions";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";

function Header() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //Verificar si el usuario está autenticado
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token); 
  }, []);

  //logout
  const handleLogout = () => {
    logout(); 
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  //login
  const handleLogin = () => {
    navigate("/login"); 
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="logo">
          <h1>TAREAS</h1>
        </div>
        <div className="profile d-flex">
          {isAuthenticated ? (
            <>
              <img
                src="./src/assets/image.png"
                className="rounded-circle"
                alt="Avatar"
              />
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="btn btn-outline-primary" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
