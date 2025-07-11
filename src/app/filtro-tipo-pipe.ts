import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTipo',
  standalone: true
})
export class FiltroTipoPipe implements PipeTransform {
  transform(productos: any[], tipo: string): any[] {
    if (!tipo) return productos;
    return productos.filter(p => p.tipoProducto?.nombre === tipo);
  }
}
