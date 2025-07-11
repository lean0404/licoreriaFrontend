export interface ProductoRequest {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  tipoProductoId: number | null;
}
