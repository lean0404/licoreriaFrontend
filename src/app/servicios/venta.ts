import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiUrl = 'http://localhost:8080/api/ventas';

  constructor(private http: HttpClient) {}

  registrarVenta(payload: any) {
    return this.http.post(this.apiUrl, payload, { responseType: 'blob' });
  }
}
