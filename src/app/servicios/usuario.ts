import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  listarVendedores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vendedores`);
  }

  actualizarPassword(id: number, nuevaPassword: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/password`, { nuevaPassword });
  }
}
