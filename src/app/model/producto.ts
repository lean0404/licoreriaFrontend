export interface Producto {
  id: number; 
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  tipoProducto?: {
    id: number;
    nombre: string;
  };
  tipoProductoId?: number;
}
