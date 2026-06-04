import React from "react";

/* TIPOS */
type Medicamento = {
  id: string;
  name: string;
  laboratory: string;
  description: string;
};

type PurchaseItem = {
  medicineId: string;
  quantity: number;
  purchasePrice: number;
  salePrice: number;
};

type NewPurchase = {
  date: string;
  provider: string;
  invoiceNumber: string;
  medicineId: string;
  quantity: number;
  precioCompra: number;
  salePrice: number;
};

type Props = {
  newPurchase?: NewPurchase;

  listaMedicamentos?: Medicamento[];
  tablaTemporal?: PurchaseItem[];
  medEncontrado?: Medicamento | null;

  setNewPurchase?: React.Dispatch<React.SetStateAction<NewPurchase>>;

  buscarMed?: () => void;
  meterALista?: () => void;
  guardarCompra?: () => void;
  regresar?: () => void;

  obtenerNombre?: (id: string) => string;
  obtenerLab?: (id: string) => string;
  obtenerDesc?: (id: string) => string;
};
const Compras: React.FC<Props> = ({
  newPurchase = {
    date: "",
    provider: "",
    invoiceNumber: "",
    medicineId: "",
    quantity: 0,
    precioCompra: 0,
    salePrice: 0,
  },

  listaMedicamentos = [],
  tablaTemporal = [],
  medEncontrado = null,

  setNewPurchase = () => {},

  buscarMed = () => {},
  meterALista = () => {},
  guardarCompra = () => {},
  regresar = () => {},

  obtenerNombre = () => "",
  obtenerLab = () => "",
  obtenerDesc = () => "",
}) => {
  return (
    <div className="purchase-container">

      <h2>Registro de Compras</h2>

      {/* DATOS COMPRA */}
      <div className="card">

        <p className="section-title">DATOS DE LA COMPRA</p>

        <div className="grid-row">

          <div className="field">
            <label>FECHA</label>
            <input
              type="date"
              value={newPurchase.date}
              onChange={(e) =>
                setNewPurchase({ ...newPurchase, date: e.target.value })
              }
            />
          </div>

          <div className="field">
            <label>PROVEEDOR</label>
            <input
              type="text"
              value={newPurchase.provider}
              onChange={(e) =>
                setNewPurchase({ ...newPurchase, provider: e.target.value })
              }
              placeholder="Nombre del proveedor"
            />
          </div>

          <div className="field">
            <label>N° FACTURA</label>
            <input
              type="text"
              value={newPurchase.invoiceNumber}
              onChange={(e) =>
                setNewPurchase({
                  ...newPurchase,
                  invoiceNumber: e.target.value,
                })
              }
              placeholder="Numero de factura"
            />
          </div>

        </div>

      </div>

      {/* BUSCAR MEDICAMENTO */}
      <div className="card">

        <p className="section-title">BUSCAR MEDICAMENTO</p>

        <div className="grid-row">

          <div className="field">
            <label>SELECCIONAR</label>

            <select
              value={newPurchase.medicineId}
              onChange={(e) => {
                setNewPurchase({
                  ...newPurchase,
                  medicineId: e.target.value,
                });
                buscarMed();
              }}
              className="form-select"
            >
              <option value="">Seleccione un producto</option>

              {listaMedicamentos.map((med) => (
                <option key={med.id} value={med.id}>
                  {med.id} - {med.name}
                </option>
              ))}
            </select>

          </div>

          <div className="field">
            <label>NOMBRE</label>
            <input type="text" value={medEncontrado?.name || ""} readOnly />
          </div>

          <div className="field">
            <label>LABORATORIO</label>
            <input
              type="text"
              value={medEncontrado?.laboratory || ""}
              readOnly
            />
          </div>

        </div>

        {/* CANTIDADES */}
        <div className="grid-row" style={{ marginTop: "25px" }}>

          <div className="field">
            <label>CANTIDAD</label>
            <input
              type="number"
              min={0}
              value={newPurchase.quantity}
              onChange={(e) =>
                setNewPurchase({
                  ...newPurchase,
                  quantity: Number(e.target.value),
                })
              }
            />
          </div>

          <div className="field">
            <label>PRECIO COMPRA</label>
            <input
              type="number"
              min={0}
              value={newPurchase.precioCompra}
              onChange={(e) =>
                setNewPurchase({
                  ...newPurchase,
                  precioCompra: Number(e.target.value),
                })
              }
            />
          </div>

          <div className="field">
            <label>PRECIO VENTA</label>
            <input
              type="number"
              min={0}
              value={newPurchase.salePrice}
              onChange={(e) =>
                setNewPurchase({
                  ...newPurchase,
                  salePrice: Number(e.target.value),
                })
              }
            />
          </div>

          <div className="field-button">
            <button type="button" className="btn-add-circle" onClick={meterALista}>
              +
            </button>
          </div>

        </div>

      </div>

      {/* TABLA */}
      <div className="card">

        <p className="section-title">DETALLE DE LA COMPRA ACTUAL</p>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>LABORATORIO</th>
                <th>DESCRIPCION</th>
                <th>CANT</th>
                <th>P. COMPRA</th>
                <th>P. VENTA</th>
              </tr>
            </thead>

            <tbody>

              {tablaTemporal.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "20px" }}>
                    No hay productos en la lista
                  </td>
                </tr>
              ) : (
                tablaTemporal.map((item, index) => (
                  <tr key={index}>
                    <td>{item.medicineId}</td>
                    <td>{obtenerNombre(item.medicineId)}</td>
                    <td>{obtenerLab(item.medicineId)}</td>
                    <td>{obtenerDesc(item.medicineId)}</td>
                    <td>{item.quantity}</td>
                    <td>{item.purchasePrice}</td>
                    <td>{item.salePrice}</td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* BOTONES */}
      <div className="footer-actions">

        <button className="btn-save" onClick={guardarCompra}>
          Guardar Datos
        </button>

        <button className="btn-exit" onClick={regresar}>
          Volver
        </button>

      </div>

    </div>
  );
};

export default Compras;