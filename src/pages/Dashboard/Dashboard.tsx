import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

  const usuarioActual = "Administrador";

  const navigate = useNavigate();

  const salir = () => {
    navigate("/");
  };

  return (
    <div className="dashboard">

      {/* header principal */}
      <div className="header-seccion">

        {/* logo pequeño */}
        <div className="logo-pequeno">
          <img src="/iconos/flor.png" alt="logo" />
        </div>

        {/* textos */}
        <div className="texto-header">
          <h1 className="titulo">Bienvenida al sistema</h1>
          <p className="subtitulo">
            Seleccione un módulo para continuar
          </p>
        </div>

        {/* usuario */}
        <div className="user-section">
          <span className="admin">{usuarioActual}</span>

          <button
            className="logout"
            onClick={salir}
          >
            Salir
          </button>
        </div>

      </div>

      {/* tarjetas */}
      <div className="contenedor">

        {/* inventario */}
        <Link
          to="/inventario"
          className="card"
          style={{ textDecoration: "none" }}
        >
          <div className="icono inventario">
            <img src="/iconos/cajita.png" alt="inventario" />
          </div>

          <h3>Inventario</h3>
          <p>Aquí puede ver y manejar los productos</p>
        </Link>

        {/* compras */}
        <Link
          to="/compras"
          className="card"
          style={{ textDecoration: "none" }}
        >
          <div className="icono compras">
            <img src="/iconos/carrito.png" alt="compras" />
          </div>

          <h3>Compras</h3>
          <p>Aquí registra las compras de la droguería</p>
        </Link>

        {/* ventas */}
        <Link
          to="/ventas"
          className="card"
          style={{ textDecoration: "none" }}
        >
          <div className="icono ventas">
            <img src="/iconos/venta.png" alt="ventas" />
          </div>

          <h3>Ventas</h3>
          <p>Control de las ventas realizadas</p>
        </Link>

        {/* informes */}
        <Link
          to="/informes"
          className="card"
          style={{ textDecoration: "none" }}
        >
          <div className="icono informes">
            <img src="/iconos/informe.png" alt="informes" />
          </div>

          <h3>Informes</h3>
          <p>Reportes del negocio</p>
        </Link>

      </div>

    </div>
  );
}

export default Dashboard;