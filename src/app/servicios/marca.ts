import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marca } from '../model/marca';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MarcaService {

  private apiUrl = 'http://localhost:8080/api/marcas';

  constructor(private http: HttpClient) {}

  getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.apiUrl, { withCredentials: true });
  }

  crearMarca(marca: Marca): Observable<Marca> {
    return this.http.post<Marca>(this.apiUrl, marca, { withCredentials: true });
  }

  actualizarMarca(id: number, marca: Marca): Observable<Marca> {
    return this.http.put<Marca>(`${this.apiUrl}/${id}`, marca, { withCredentials: true });
  }

  eliminarMarca(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
