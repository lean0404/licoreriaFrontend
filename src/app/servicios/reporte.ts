import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReporteService {

  private apiUrl = 'http://localhost:8080/api/reportes';

  constructor(private http: HttpClient) {}

  consultarProductoMasVendido(desde: string, hasta: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/producto-mas-vendido?desde=${desde}&hasta=${hasta}`, {
      withCredentials: true
    });
  }

  consultarProductoMenosVendido(desde: string, hasta: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/producto-menos-vendido?desde=${desde}&hasta=${hasta}`, {
      withCredentials: true
    });
  }

  consultarMetodoPagoMasUsado(): Observable<any> {
    return this.http.get(`${this.apiUrl}/metodo-pago-mas-usado`, {
      withCredentials: true
    });
  }

  descargarMasVendidosPDF(desde: string, hasta: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/producto-mas-vendido/pdf?desde=${desde}&hasta=${hasta}`, {
      responseType: 'blob',
      withCredentials: true
    });
  }

  descargarMenosVendidosPDF(desde: string, hasta: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/producto-menos-vendido/pdf?desde=${desde}&hasta=${hasta}`, {
      responseType: 'blob',
      withCredentials: true
    });
  }
}
