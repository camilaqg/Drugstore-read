import React from "react";

/* TIPOS */
type Medicine = {
  id: string;
  name: string;
  laboratory: string;
  description: string;
  stock: number;
  purchasePrice: number;
  salePrice: number;
  status: string;
};

type NewMedicine = {
  id: string;
  name: string;
  laboratory: string;
  description: string;
  stock: number;
  purchasePrice: number;
  salePrice: number;
};

type Props = {
  listaMeds?: Medicine[];
  newMedicine?: NewMedicine;

  setNewMedicine?: React.Dispatch<React.SetStateAction<NewMedicine>>;

  buscar?: (value: string) => void;
  seleccionar?: (m: Medicine) => void;

  actualizar?: () => void;
  borrar?: () => void;
  registrar?: () => void;
  limpiar?: () => void;
  irAlMenu?: () => void;
};

const Inventario: React.FC<Props> = ({
  listaMeds = [],
  newMedicine = {
    id: "",
    name: "",
    laboratory: "",
    description: "",
    stock: 0,
    purchasePrice: 0,
    salePrice: 0,
  },
  setNewMedicine = () => {},
  buscar = () => {},
  seleccionar = () => {},
  actualizar = () => {},
  borrar = () => {},
  registrar = () => {},
  limpiar = () => {},
  irAlMenu = () => {},
}) => {
  return (
    <div className="inventory-container">

      {/* HEADER */}
      <div className="header-seccion">
        <h2>Gestión de Inventario</h2>

        <section className="tarjeta-blanca">
          <p className="titulo-gris">DATOS DEL MEDICAMENTO</p>

          <div className="grid-formulario">

            {/* ID / CODIGO */}
            <div className="campo">
              <label>ID / CODIGO</label>

              <select
                value={newMedicine.id}
                onChange={(e) =>
                  setNewMedicine({ ...newMedicine, id: e.target.value })
                }
                className="form-select"
              >
                {listaMeds.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.id}
                  </option>
                ))}
              </select>
            </div>

            {/* NOMBRE */}
            <div className="campo grande">
              <label>NOMBRE COMERCIAL</label>
              <input
                type="text"
                value={newMedicine.name}
                onChange={(e) =>
                  setNewMedicine({ ...newMedicine, name: e.target.value })
                }
              />
            </div>

            {/* LABORATORIO */}
            <div className="campo">
              <label>LABORATORIO</label>
              <input
                type="text"
                value={newMedicine.laboratory}
                onChange={(e) =>
                  setNewMedicine({ ...newMedicine, laboratory: e.target.value })
                }
              />
            </div>

            {/* DESCRIPCION */}
            <div className="campo grande">
              <label>DESCRIPCIÓN</label>
              <input
                type="text"
                value={newMedicine.description}
                onChange={(e) =>
                  setNewMedicine({ ...newMedicine, description: e.target.value })
                }
              />
            </div>

            {/* STOCK */}
            <div className="campo">
              <label>STOCK INICIAL</label>
              <input
                type="number"
                value={newMedicine.stock}
                onChange={(e) =>
                  setNewMedicine({
                    ...newMedicine,
                    stock: Number(e.target.value),
                  })
                }
              />
            </div>

            {/* PRECIO COMPRA */}
            <div className="campo">
              <label>PRECIO COMPRA</label>
              <input
                type="number"
                value={newMedicine.purchasePrice}
                onChange={(e) =>
                  setNewMedicine({
                    ...newMedicine,
                    purchasePrice: Number(e.target.value),
                  })
                }
              />
            </div>

            {/* PRECIO VENTA */}
            <div className="campo">
              <label>PRECIO VENTA</label>
              <input
                type="number"
                value={newMedicine.salePrice}
                onChange={(e) =>
                  setNewMedicine({
                    ...newMedicine,
                    salePrice: Number(e.target.value),
                  })
                }
              />
            </div>

          </div>
        </section>

        {/* BUSQUEDA */}
        <div className="caja-busqueda">
          <input
            type="text"
            placeholder="Filtrar por nombre..."
            onChange={(e) => buscar(e.target.value)}
          />
        </div>

      </div>

      {/* TABLA INVENTARIO */}
      <section className="tarjeta-blanca">

        <p className="titulo-gris">INVENTARIO ACTUAL</p>

        <div className="tabla-scroll">

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>MEDICAMENTO</th>
                <th>LAB</th>
                <th>STOCK</th>
                <th>P. COMPRA</th>
                <th>P. VENTA</th>
                <th>ESTADO</th>
              </tr>
            </thead>

            <tbody>

              {listaMeds.map((m) => (
                <tr
                  key={m.id}
                  onClick={() => seleccionar(m)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{m.id}</td>
                  <td>{m.name}</td>
                  <td>{m.laboratory}</td>
                  <td>{m.stock}</td>
                  <td>{m.purchasePrice}</td>
                  <td>{m.salePrice}</td>
                  <td>
                    <span className="etiqueta-estado" data-status={m.status}>
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </section>

      {/* BOTONES */}
      <div className="botones-abajo">

        <button onClick={actualizar} className="btn btn-mod">
          Modificar
        </button>

        <button onClick={borrar} className="btn btn-del">
          Eliminar
        </button>

        <button onClick={registrar} className="btn btn-reg">
          Registrar
        </button>

        <button onClick={limpiar} className="btn btn-clear">
          Limpiar
        </button>

        <button onClick={irAlMenu} className="btn btn-exit">
          Salir
        </button>

      </div>

    </div>
  );
};

export default Inventario;