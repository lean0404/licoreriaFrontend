import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoProducto } from '../model/tipo-producto.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TipoProductoService {

  private apiUrl = 'http://localhost:8080/api/tipos-producto';

  constructor(private http: HttpClient) {}

  obtenerTiposProducto(): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(this.apiUrl, { withCredentials: true });
  }
}
