
export interface Venta {
  fechaVenta: string;
  Cliente: string;
  Factura: string;
  Codigo: string;
  Medicamento: string;
  Laboratorio: string;
  Cantidad: number;
  Precio: number;
  Total: number;
}

const STORAGE_KEY = "ventas";

export const ventasService = {

  obtenerVentas(): Venta[] {
    const ventas = localStorage.getItem(STORAGE_KEY);

    if (!ventas) {
      return [];
    }

    return JSON.parse(ventas);
  },

  guardarVenta(nuevaVenta: Venta): void {
    const ventas = this.obtenerVentas();

    ventas.push(nuevaVenta);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(ventas)
    );
  },

  actualizarVentas(ventas: Venta[]): void {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(ventas)
    );
  },

  eliminarVenta(factura: string): void {
    const ventasFiltradas = this.obtenerVentas().filter(
      venta => venta.Factura !== factura
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(ventasFiltradas)
    );
  },

  buscarPorFactura(factura: string): Venta | undefined {
    return this.obtenerVentas().find(
      venta => venta.Factura === factura
    );
  }

};