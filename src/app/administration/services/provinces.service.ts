import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProvincesService {

 private http = inject(HttpClient);

  // Obtener provincias
  getProvinces(): Observable<any> {
    return this.http.get<any>('http://localhost:8081/provinciasServices/api/provincias');
  }
  
  // Obtener cantones por provincia
  getCantones(provinceId?: string): Observable<any> {
    return this.http.get(`http://localhost:8081/provinciasServices/api/cantones?provincia=${provinceId}`);
  }
  
  // Obtener parroquias por cantón
  getParroquias(cantonId?: string): Observable<any> {
    return this.http.get(`http://localhost:8081/provinciasServices/api/parroquias?canton=${cantonId}`);
  }
}
