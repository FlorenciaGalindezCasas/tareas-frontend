import React, { useState } from "react";
import { login } from "../../store/actions/userActions";
import { useNavigate } from "react-router-dom";
import "../login/Login.css";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors(""); 
    try {
      const res = await login({
        email: loginData.email,
        password: loginData.password,
      });
      if (res && res.success) {
        console.log("Login exitoso");
        localStorage.setItem("accessToken", res.token);
        navigate("/home");
      } else {
        setErrors(
          res?.error || "Error desconocido. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      setErrors(
        error.message || "Error desconocido. Por favor, inténtalo de nuevo."
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="d-flex flex-column login">
      <div className="icon">
        <h1>TAREAS</h1>
        <p>Maneja tus tareas!</p>
      </div>
      <div className="login-form">
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="nombre@ejemplo.com"
              name="email"
              value={loginData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword5" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              id="inputPassword5"
              className="form-control"
              aria-describedby="passwordHelpBlock"
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />
          </div>
          {errors && <p className="text-danger">{errors}</p>}{" "}
          <div className="btn-login d-flex">
            <button type="submit" className="btn btn-outline-success">
              Ingresa
            </button>
          </div>
        </form>
        <div className="registro">
          <a href="/register">No tengo cuenta! Crear</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
