import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../model/producto';

@Pipe({
  name: 'filtroTipo',
  standalone: true
})
export class FiltroTipoPipe implements PipeTransform {
  transform(
    productos: Producto[] = [],
    texto: string = '',
    precioMin: number | null = null,
    precioMax: number | null = null
  ): Producto[] {
    if (!productos.length) return [];

    const textoLower = texto.trim().toLowerCase();

    return productos.filter(p => {
      const coincideTexto =
        !textoLower ||
        p.nombre?.toLowerCase().includes(textoLower) ||
        p.tipoProductoNombre?.toLowerCase().includes(textoLower) ||
        p.marcaNombre?.toLowerCase().includes(textoLower); 

      const coincideMin = precioMin == null || p.precio >= precioMin;
      const coincideMax = precioMax == null || p.precio <= precioMax;

      return coincideTexto && coincideMin && coincideMax;
    });
  }
}
