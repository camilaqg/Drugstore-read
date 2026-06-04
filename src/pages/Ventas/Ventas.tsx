import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Ventas.css";
import { ventasService } from "../../services/ventasService";

interface Medicamento {
  Codigo: string;
  Medicamento: string;
  Laboratorio: string;
  Precio: number;
}

interface VentaItem {
  Codigo: string;
  Medicamento: string;
  Laboratorio: string;
  Cantidad: number;
  Precio: number;
  Total: number;
}

const Ventas: React.FC = () => {
  const navigate = useNavigate();

  // FORMULARIO
  const [fechaVenta, setFechaVenta] = useState("");
  const [cliente, setCliente] = useState("");
  const [factura, setFactura] = useState("");
  const [codigo, setCodigo] = useState("");
  const [medicamento, setMedicamento] = useState("");
  const [laboratorio, setLaboratorio] = useState("");
  const [fechaCaducidad, setFechaCaducidad] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [precio, setPrecio] = useState(0);
  const [total, setTotal] = useState(0);

  // DETALLE
  const [detalleVenta, setDetalleVenta] = useState<VentaItem[]>([]);
  const [totalGeneral, setTotalGeneral] = useState(0);
  const [ventaConfirmada, setVentaConfirmada] = useState(false);

  // ESTADÍSTICAS
  const [ventasHoy, setVentasHoy] = useState(0);
  const [transacciones, setTransacciones] = useState(0);
  const [productosVendidos, setProductosVendidos] = useState(0);
  const [ventasMes, setVentasMes] = useState(0);

  // MEDICAMENTOS
  const medicamentos: Medicamento[] = [
    { Codigo: "001", Medicamento: "Acetaminofén", Laboratorio: "Genfar", Precio: 1500 },
    { Codigo: "002", Medicamento: "Ibuprofeno", Laboratorio: "MK", Precio: 2000 },
    { Codigo: "003", Medicamento: "Amoxicilina", Laboratorio: "La Santé", Precio: 5000 }
  ];

  useEffect(() => {
    const data = localStorage.getItem("estadisticasVentas");
    if (data) {
      const stats = JSON.parse(data);
      setVentasHoy(stats.ventasHoy || 0);
      setTransacciones(stats.transacciones || 0);
      setProductosVendidos(stats.productosVendidos || 0);
      setVentasMes(stats.ventasMes || 0);
    }
  }, []);

  // BUSCAR MEDICAMENTO
  const buscarMedicamento = (codigo: string) => {
    const med = medicamentos.find(m => m.Codigo === codigo);

    if (med) {
      setMedicamento(med.Medicamento);
      setLaboratorio(med.Laboratorio);
      setPrecio(med.Precio);
      setTotal(med.Precio * cantidad);
    }
  };

  // CALCULAR TOTAL
  const calcularTotalProducto = (cant: number) => {
    const nuevaCantidad = cant < 1 ? 1 : cant;
    setCantidad(nuevaCantidad);
    setTotal(nuevaCantidad * precio);
  };

  // AGREGAR PRODUCTO
  const agregarProducto = () => {
    if (!medicamento || cantidad <= 0 || precio <= 0) {
      alert("Completa los datos");
      return;
    }

    const item: VentaItem = {
      Codigo: codigo,
      Medicamento: medicamento,
      Laboratorio: laboratorio,
      Cantidad: cantidad,
      Precio: precio,
      Total: cantidad * precio
    };

    const nuevaLista = [...detalleVenta, item];
    setDetalleVenta(nuevaLista);

    const nuevoTotal = nuevaLista.reduce((a, b) => a + b.Total, 0);
    setTotalGeneral(nuevoTotal);

    setVentaConfirmada(false);

    setCodigo("");
    setMedicamento("");
    setLaboratorio("");
    setCantidad(1);
    setPrecio(0);
    setTotal(0);
  };

  // QUITAR PRODUCTO
  const quitarProducto = (index: number) => {
    const nuevaLista = detalleVenta.filter((_, i) => i !== index);

    setDetalleVenta(nuevaLista);
    setTotalGeneral(nuevaLista.reduce((a, b) => a + b.Total, 0));
    setVentaConfirmada(false);
  };

  // CONFIRMAR VENTA
  const confirmarVenta = () => {
    if (detalleVenta.length === 0) {
      alert("Rellena todos los datos");
      return;
    }

   detalleVenta.forEach((item) => {
  ventasService.guardarVenta({
    fechaVenta,
    Cliente: cliente,
    Factura: factura,
    Codigo: item.Codigo,
    Medicamento: item.Medicamento,
    Laboratorio: item.Laboratorio,
    Cantidad: item.Cantidad,
    Precio: item.Precio,
    Total: item.Total
  });
});

    const nuevaTrans = transacciones + 1;
    const nuevoHoy = ventasHoy + totalGeneral;
    const nuevoMes = ventasMes + totalGeneral;

    let prod = productosVendidos;
    detalleVenta.forEach(i => (prod += i.Cantidad));

    setTransacciones(nuevaTrans);
    setVentasHoy(nuevoHoy);
    setVentasMes(nuevoMes);
    setProductosVendidos(prod);

    localStorage.setItem(
      "estadisticasVentas",
      JSON.stringify({
        ventasHoy: nuevoHoy,
        transacciones: nuevaTrans,
        productosVendidos: prod,
        ventasMes: nuevoMes
      })
    );

    setVentaConfirmada(true);
    alert("Venta guardada");
  };

  // IMPRIMIR
  const imprimirVenta = () => {
    if (!ventaConfirmada) {
      alert("Confirma la venta primero");
      return;
    }

    window.print();
    limpiarFormulario();
  };

  // LIMPIAR
  const limpiarFormulario = () => {
    setFechaVenta("");
    setCliente("");
    setFactura("");
    setCodigo("");
    setMedicamento("");
    setLaboratorio("");
    setFechaCaducidad("");
    setCantidad(1);
    setPrecio(0);
    setTotal(0);
    setDetalleVenta([]);
    setTotalGeneral(0);
    setVentaConfirmada(false);
  };

  // SALIR
  const salir = () => {
    navigate("/dashboard");
  };

  return (
  <div className="ventas-container">

    <div className="titulo-ventas">
      <h2>Registro de Ventas</h2>
    </div>

    {/* RESUMEN */}
    <div className="resumen">
      <div className="tarjeta">
        <p>VENTAS HOY</p>
        <h3>${ventasHoy}</h3>
      </div>

      <div className="tarjeta">
        <p>TRANSACCIONES</p>
        <h3>{transacciones}</h3>
      </div>

      <div className="tarjeta">
        <p>PRODUCTOS VENDIDOS</p>
        <h3>{productosVendidos}</h3>
      </div>

      <div className="tarjeta">
        <p>VENTAS DEL MES</p>
        <h3>${ventasMes}</h3>
      </div>
    </div>

    {/* FORMULARIO */}
    <div className="formulario-venta">

      <h3>Nueva Venta</h3>

      <div className="fila">

        <div className="campo">
          <label>Fecha Venta</label>
          <input
            type="date"
            value={fechaVenta}
            onChange={(e) => setFechaVenta(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Cliente</label>
          <input
            type="text"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Factura</label>
          <input
            type="text"
            value={factura}
            onChange={(e) => setFactura(e.target.value)}
          />
        </div>

      </div>

      <div className="fila">

        <div className="campo">
          <label>Medicamento</label>
          <select
            value={codigo}
            onChange={(e) => {
              setCodigo(e.target.value);
              buscarMedicamento(e.target.value);
            }}
          >
            <option value="">Seleccione...</option>

            {medicamentos.map((m) => (
              <option key={m.Codigo} value={m.Codigo}>
                {m.Codigo} - {m.Medicamento}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label>Nombre</label>
          <input value={medicamento} readOnly />
        </div>

        <div className="campo">
          <label>Laboratorio</label>
          <input value={laboratorio} readOnly />
        </div>

        <div className="campo">
          <label>Fecha Caducidad</label>
          <input
            type="date"
            value={fechaCaducidad}
            onChange={(e) => setFechaCaducidad(e.target.value)}
          />
        </div>

      </div>

      <div className="fila">

        <div className="campo">
          <label>Cantidad</label>
          <input
            type="number"
            min={1}
            value={cantidad}
            onChange={(e) =>
              calcularTotalProducto(Number(e.target.value))
            }
          />
        </div>

        <div className="campo">
          <label>Precio</label>
          <input value={precio} readOnly />
        </div>

        <div className="campo total">
          <label>Total</label>
          <input value={total} readOnly />
        </div>

        <button
          type="button"
          className="boton-agregar"
          onClick={agregarProducto}
        >
          +
        </button>

      </div>

    </div>

    {/* DETALLE */}
    <div className="detalle">

      <table>

        <thead>
          <tr>
            <th>Código</th>
            <th>Medicamento</th>
            <th>Laboratorio</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Total</th>
            <th>Acción</th>
          </tr>
        </thead>

        <tbody>

          {detalleVenta.length > 0 ? (
            detalleVenta.map((item, i) => (
              <tr key={i}>
                <td>{item.Codigo}</td>
                <td>{item.Medicamento}</td>
                <td>{item.Laboratorio}</td>
                <td>{item.Cantidad}</td>
                <td>${item.Precio}</td>
                <td>${item.Total}</td>

                <td>
                  <button
                    className="boton-quitar"
                    onClick={() => quitarProducto(i)}
                  >
                    Quitar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>
                No hay productos agregados
              </td>
            </tr>
          )}

        </tbody>

      </table>

      <div className="total-general">
        Total General: ${totalGeneral}
      </div>

    </div>

    {/* BOTONES */}
    <div className="botones">

      <button
        className="boton confirmar"
        onClick={confirmarVenta}
      >
        Confirmar Venta
      </button>

      <button
        className="boton imprimir"
        onClick={imprimirVenta}
      >
        Imprimir
      </button>

      <button
        className="boton limpiar"
        onClick={limpiarFormulario}
      >
        Limpiar
      </button>

      <button
        className="boton salir"
        onClick={salir}
      >
        ⟵ Salir
      </button>

    </div>

  </div>
);
}

export default Ventas;