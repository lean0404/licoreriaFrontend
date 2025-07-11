import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class VentaService {
  private baseUrl = 'http://localhost:8080/api/ventas';

  constructor(private http: HttpClient) {}

  registrarVenta(venta: any) {
    return this.http.post(`${this.baseUrl}/registrar`, venta, { withCredentials: true });
  }
}
