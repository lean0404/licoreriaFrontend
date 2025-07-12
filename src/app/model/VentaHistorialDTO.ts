export interface VentaHistorialDTO {
  id: number;
  fecha: string;
  metodoPago: string;
  tipoComprobante: string;
  documentoCliente: string;
  totalProductos: number;
  totalVenta: number;
}
