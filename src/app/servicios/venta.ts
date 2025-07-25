import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VentaHistorialDTO } from '../model/VentaHistorialDTO';

@Injectable({ providedIn: 'root' })
export class VentaService {
  private apiUrl = 'http://localhost:8080/api/ventas';

  constructor(private http: HttpClient) {}

  obtenerHistorial() {
    return this.http.get<VentaHistorialDTO[]>(`${this.apiUrl}/mis-ventas`, { withCredentials: true });
  }

  obtenerHistorialPorFechas(desde: string, hasta: string) {
    return this.http.get<VentaHistorialDTO[]>(
      `${this.apiUrl}/mis-ventas/por-fechas?desde=${desde}&hasta=${hasta}`,
      { withCredentials: true }
    );
  }

  registrarVenta(payload: any) {
    return this.http.post(this.apiUrl, payload, { responseType: 'blob', withCredentials: true });
  }

  emitirReportePorFechas(desde: string, hasta: string) {
    return this.http.get(`${this.apiUrl}/mis-ventas/por-fechas/pdf?desde=${desde}&hasta=${hasta}`, {
      responseType: 'blob',
      withCredentials: true
    });
  }
}
