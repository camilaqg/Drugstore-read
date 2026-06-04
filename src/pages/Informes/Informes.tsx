import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Informes.css";
import { ventasService } from "../../services/ventasService";

interface Venta {
  fechaVenta: string;
  Factura: string;
  Cliente: string;
  Medicamento: string;
  Cantidad: number;
  Total: number;
}

const Informes: React.FC = () => {
  const navigate = useNavigate();

  const [fechaInicial, setFechaInicial] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [medicamento, setMedicamento] = useState("");

  const [listaVentas, setListaVentas] = useState<Venta[]>([]);
  const [todasLasVentas, setTodasLasVentas] = useState<Venta[]>([]);

  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = () => {
    const ventas = ventasService.obtenerVentas();

    setTodasLasVentas(ventas);
    setListaVentas(ventas);
  };

  const buscarVentas = () => {
    if (!fechaInicial && !fechaFinal && !medicamento) {
      alert(
        "Debes completar al menos un campo para realizar la búsqueda"
      );
      return;
    }

    const inicio = fechaInicial ? new Date(fechaInicial) : null;
    const fin = fechaFinal ? new Date(fechaFinal) : null;

    if (inicio) {
      inicio.setHours(0, 0, 0, 0);
    }

    if (fin) {
      fin.setHours(23, 59, 59, 999);
    }

    const ventasFiltradas = todasLasVentas.filter((v) => {
      const fechaVenta = new Date(v.fechaVenta);

      const cumpleFecha =
        (!inicio || fechaVenta >= inicio) &&
        (!fin || fechaVenta <= fin);

      const cumpleMedicamento =
        !medicamento ||
        v.Medicamento.toLowerCase().includes(
          medicamento.toLowerCase()
        );

      return cumpleFecha && cumpleMedicamento;
    });

    setListaVentas(ventasFiltradas);
  };

  const limpiarFiltros = () => {
    setFechaInicial("");
    setFechaFinal("");
    setMedicamento("");

    setListaVentas(todasLasVentas);
  };

  const volverInicio = () => {
    navigate("/dashboard");
  };

  return (
    <div className="informes-container">
      <div className="titulo-informes">
        <h2>Informes de Venta</h2>
      </div>

      <form>
        <section className="filtros">
          <div className="fila-filtros">
            <div className="campo">
              <label>FECHA INICIAL</label>
              <input
                type="date"
                value={fechaInicial}
                onChange={(e) =>
                  setFechaInicial(e.target.value)
                }
              />
            </div>

            <div className="campo">
              <label>FECHA FINAL</label>
              <input
                type="date"
                value={fechaFinal}
                onChange={(e) =>
                  setFechaFinal(e.target.value)
                }
              />
            </div>

            <div className="campo">
              <label>MEDICAMENTO</label>

              <input
                type="text"
                placeholder="Buscar medicamento"
                value={medicamento}
                onChange={(e) =>
                  setMedicamento(e.target.value)
                }
              />
            </div>

            <div className="botones-filtro">
              <button
                type="button"
                className="buscar"
                onClick={buscarVentas}
              >
                Buscar
              </button>

              <button
                type="button"
                className="limpiar"
                onClick={limpiarFiltros}
              >
                Limpiar
              </button>
            </div>
          </div>
        </section>
      </form>

      <section className="resultados-ventas">
        <table>
          <thead>
            <tr>
              <th>FECHA</th>
              <th>FACTURA</th>
              <th>CLIENTE</th>
              <th>PRODUCTO</th>
              <th>CANTIDAD</th>
              <th>TOTAL</th>
            </tr>
          </thead>

          <tbody>
            {listaVentas.map((v, index) => (
              <tr key={index}>
                <td>
                  {new Date(
                    v.fechaVenta
                  ).toLocaleDateString("es-CO")}
                </td>

                <td>{v.Factura}</td>
                <td>{v.Cliente}</td>
                <td>{v.Medicamento}</td>
                <td>{v.Cantidad}</td>

                <td>
                  {v.Total.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                  })}
                </td>
              </tr>
            ))}

            {listaVentas.length === 0 && (
              <tr>
                <td colSpan={6} className="sin-resultados">
                  No se encontraron ventas con los filtros
                  seleccionados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <div className="volver">
        <button
          type="button"
          onClick={volverInicio}
        >
          ⟵ Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default Informes;