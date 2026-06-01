import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registro.css";
import flor from "../../assets/flor.png";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const Registro = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    localStorage.setItem(
      "usuario",
      JSON.stringify({
        name,
        email,
        username,
        password,
      })
    );

    alert("Usuario registrado correctamente");

    navigate("/");
  };

  return (
    <div className="container">

      <div className="left">
        <div className="card">

          <div className="logo">
            <img src={flor} alt="flor" />
          </div>

          <h2>Drogueria Pili</h2>
          <p>SISTEMA DE GESTION</p>

        </div>
      </div>

      <div className="right">
        <div className="register-box">

          <h1>Crear cuenta</h1>

          <form onSubmit={Registro}>

            <div className="input-group">
              <label>Nombre completo</label>
              <input
                type="text"
                placeholder="Ingrese su nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Correo</label>
              <input
                type="email"
                placeholder="Ingrese su correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Usuario</label>
              <input
                type="text"
                placeholder="Ingrese su usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Contraseña</label>
              <input
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {password.length < 6 && password && (
                <p style={{ color: "#0f0f0f", textAlign: "center", marginTop: "5px" }}>
                  *Mínimo 6 caracteres*
                </p>
              )}
            </div>

            <div className="input-group">
              <label>Confirmar contraseña</label>
              <input
                type="password"
                placeholder="Repita su contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              {password !== confirmPassword && confirmPassword && (
                <p style={{ color: "#0f0f0f", textAlign: "center", marginTop: "5px" }}>
                  *Las contraseñas no coinciden*
                </p>
              )}
            </div>

            <button type="submit">
              Registrarse
            </button>

            <p style={{ textAlign: "center" }}>
              
            </p>

          </form>

        </div>
      </div>

    </div>
  );
}

export default Register;