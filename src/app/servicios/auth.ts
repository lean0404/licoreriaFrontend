import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ username: string, rol: string }> {
    return this.http.post<{ username: string, rol: string }>(
      `${this.url}/login`,
      { username, password },
      { withCredentials: true }
    ).pipe(
      tap(res => {
        this.setUsuarioActual(res.username, res.rol);
      })
    );
  }

  private setUsuarioActual(username: string, rol: string) {
    localStorage.setItem('username', username);
    localStorage.setItem('rol', rol);
  }

  getRolActual(): string | null {
    return localStorage.getItem('rol');
  }

  getUsernameActual(): string | null {
    return localStorage.getItem('username');
  }

  logout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('rol');
  }

  registrarUsuario(usuario: { username: string; password: string; roles: string[] }): Observable<string> {
    return this.http.post(
      `${this.url}/registrar`,
      usuario,
      { responseType: 'text', withCredentials: true }
    );
  }
  actualizarVendedor(id: number, datos: { username: string; password: string; roles: string[] }): Observable<string> {
  return this.http.put(
    `${this.url}/vendedores/${id}`,
    datos,
    { responseType: 'text', withCredentials: true }
  );
}

}
