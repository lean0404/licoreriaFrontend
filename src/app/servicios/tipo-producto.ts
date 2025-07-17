import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoProducto } from '../model/tipo-producto.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TipoProductoService {

  private apiUrl = 'http://localhost:8080/api/tipos-producto';

  constructor(private http: HttpClient) {}

  getTipos(): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(this.apiUrl, { withCredentials: true });
  }

  crearTipo(tipo: TipoProducto): Observable<TipoProducto> {
    return this.http.post<TipoProducto>(this.apiUrl, tipo, { withCredentials: true });
  }

  actualizarTipo(id: number, tipo: TipoProducto): Observable<TipoProducto> {
    return this.http.put<TipoProducto>(`${this.apiUrl}/${id}`, tipo, { withCredentials: true });
  }

  eliminarTipo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  obtenerTiposProducto(): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(this.apiUrl, { withCredentials: true });
  }
}
