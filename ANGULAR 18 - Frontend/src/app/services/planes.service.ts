import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalService } from './local.service';
import { Planes } from '../interface/planes.interface';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private localService: LocalService, private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.localService.token; // Obtiene el token del LocalService
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  //MOSTRAR PLANES
  mostrarPlan(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/planes/All`);
  }

  //VER UN SOLO PLAN
  mostrarUnSoloPlan(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/planes/Only/${id}`);
  }

  //CREAR PLAN
  crearPlan(imagen: string, nombre: string, descripcion: string, duracion: number, precio: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/planes/Create`, { imagen: imagen, nombre: nombre, descripcion: descripcion, duracion: duracion, precio: precio }, {headers: this.getAuthHeaders()});
  }

  //MODIFICAR PLAN
  modificarPlan(id: number, imagen: string, nombre: string, descripcion: string, duracion: number, precio: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/planes/Modify/${id}`, { imagen: imagen, nombre: nombre, descripcion: descripcion, duracion: duracion, precio: precio }, {headers: this.getAuthHeaders()});
  }

  // MODIFICAR CAMPOS DE PLAN
  modificarCampoPlan(id: number, body: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/planes/ModifyCamp/${id}`, body, {headers: this.getAuthHeaders()});
  }

  //ELIMINAR PLAN
  eliminarPlan(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/planes/Delete/${id}`, {headers: this.getAuthHeaders()});
  }

  //CONTRATAR PLAN
  contratarPlan(idUsu: number, idPlan: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/planes/Hire`, { idUsu: idUsu, idPlan: idPlan }, {headers: this.getAuthHeaders()});
  }

  //====================================================================================================================
  //====================================================================================================================
  //====================================================================================================================

  //MOSTRAR PLANES ASIGNADOS
  mostrarPlanesAsignados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/planesAsignados/All`);
  }

  //VER UN SOLO PLAN ASIGNADO
  mostrarUnSoloPlanesAsignados(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/planesAsignados/Only/${id}`);
  }

  //CREAR PLAN ASIGNADO
  crearPlanesAsignados(idPlan: number, idUsu: number, completado: Boolean): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/planesAsignados/Create`, { idPlan: idPlan, idUsu: idUsu, completado: completado }, {headers: this.getAuthHeaders()});
  }

  //MODIFICAR PLAN ASIGNADO
  modificarPlanesAsignados(id: number, idPlan: number, idUsu: number, completado: Boolean): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/planesAsignados/Modify/${id}`, { idPlan: idPlan, idUsu: idUsu, completado: completado }, {headers: this.getAuthHeaders()});
  }

  // MODIFICAR CAMPOS DE PLAN ASIGNADO
  modificarCampoPlanesAsignados(id: number, body: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/planesAsignados/ModifyCamp/${id}`, body, {headers: this.getAuthHeaders()});
  }

  //ELIMINAR PLAN ASIGNADO
  eliminarPlanesAsignados(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/planesAsignados/Delete/${id}`, {headers: this.getAuthHeaders()});
  }

  //MIS PLANES
  misPlanes(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/planesAsignados/SeeMy/${id}`, {headers: this.getAuthHeaders()});
  }
}
