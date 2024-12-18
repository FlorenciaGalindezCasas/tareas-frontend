import React, { useState } from "react";
import { register } from "../../store/actions/userActions";
import { useNavigate } from "react-router-dom";
import "../register/Register.css";

function Register() {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(""); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validaciones locales
    const { username, email, password } = registerData;
    if (!username || !email || !password) {
      setErrors("Todos los campos son obligatorios");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors("Por favor, ingresa un correo válido");
      return;
    }
    if (password.length < 6) {
      setErrors("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setErrors(""); 
    try {
      const res = await register({ username, email, password });
      if (res && res.success) {
        console.log("Registration successful");
        navigate("/login"); 
      } else {
        setErrors(res?.error || "Ocurrió un error durante el registro");
      }
    } catch (error) {
      setErrors(error.message || "Ocurrió un error desconocido");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="d-flex flex-column register">
      <div className="icon">
        <h1>REGISTRO</h1>
        <p>Crea una cuenta para manejar tus tareas!</p>
      </div>
      <div className="register-form">
        <form onSubmit={handleRegister}>
          {errors && <p className="text-danger">{errors}</p>}
          <div className="mb-3">
            <label htmlFor="inputUsername" className="form-label">
              Nombre de usuario
            </label>
            <input
              type="text"
              className="form-control"
              id="inputUsername"
              placeholder="Ingresa nombre de usuario"
              name="username"
              value={registerData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="nombre@ejemplo.com"
              name="email"
              value={registerData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Ingresa una contraseña"
              name="password"
              value={registerData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="btn-register d-flex">
            <button type="submit" className="btn btn-outline-success">
              Registrarse
            </button>
          </div>
        </form>
        <div className="ingreso">
          <a href="/login">Ya tengo un usuario! Ingresar</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
