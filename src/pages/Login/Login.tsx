import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorCampos, setErrorCampos] = useState(false);
  const [errorCredenciales, setErrorCredenciales] = useState(false);

  const navigate = useNavigate();

const login = (e: React.FormEvent) => {
  e.preventDefault();

  if (!username || !password) {
    setErrorCampos(true);
    setErrorCredenciales(false);
    return;
  }

  setErrorCampos(false);

  // Administrador
  if (username === "admin" && password === "1234") {
    setErrorCredenciales(false);
    navigate("/dashboard");
    return;
  }

  // Usuario registrado
  const usuarioGuardado = localStorage.getItem("usuario");

  if (usuarioGuardado) {
    const datos = JSON.parse(usuarioGuardado);

    if (
      username === datos.username &&
      password === datos.password
    ) {
      setErrorCredenciales(false);
      navigate("/dashboard");
      return;
    }
  }

  // Si no coincide ninguna opción
  setErrorCredenciales(true);
};
  return (
    <div className="container">

      {/* lado izquierdo logo */}
      <div className="left">
        <div className="card">

          <div className="logo">
            <img src="/iconos/flor.png" alt="flor" />
          </div>

          <h1>Droguería Pili</h1>
          <p>SISTEMA DE GESTIÓN</p>

        </div>
      </div>

      {/* lado derecho login */}
      <div className="right">
        <div className="login-box">

          <h2>Ingresar al sistema</h2>

          <form onSubmit={login}>

            <div className="input-group">
              <label>Usuario</label>

              <input
                type="text"
                placeholder="Ingrese su usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-group">

              <label>Contraseña</label>

              <input
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {errorCampos && (
                <p
                  style={{
                    color: "#0f0f0f",
                    marginTop: "5px",
                    textAlign: "center",
                  }}
                >
                  *Campos obligatorios*
                </p>
              )}

              {errorCredenciales && (
                <p
                  style={{
                    color: "#0f0f0f",
                    marginTop: "5px",
                    textAlign: "center",
                  }}
                >
                  *Usuario o contraseña incorrectos*
                </p>
              )}

            </div>

            <button type="submit">
              Ingresar
            </button>

            <p style={{ textAlign: "center", marginTop: "10px" }}>
              ¿No tienes cuenta?{" "}
              <Link to="/register">
                Regístrate
              </Link>
            </p>

          </form>

        </div>
      </div>

    </div>
  );
}

export default Login;