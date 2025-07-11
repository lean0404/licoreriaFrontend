export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  tipoProductoId?: number;
  tipoProductoNombre?: string;
}
