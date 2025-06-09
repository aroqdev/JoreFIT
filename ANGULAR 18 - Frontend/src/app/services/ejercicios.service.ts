import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ejercicios } from '../interface/ejercicios.interface';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {

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

  //MOSTRAR EJERCICIOS
  mostrarEjercicios(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ejercicios/All`);
  }

  //VER UN SOLO EJERCICIO
  mostrarUnSoloEjercicios(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ejercicios/Only/${id}`);
  }

  //CREAR EJERCICIO
  crearEjercicios(imagen: string, nombres: string, descripcion: string, series: number, repeticiones: string, tipo: string, musculo: string, intensidad: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ejercicios/Create`, { imagen: imagen, nombres: nombres, descripcion: descripcion, series: series, repeticiones: repeticiones, tipo: tipo, musculo: musculo, intensidad: intensidad }, {headers: this.getAuthHeaders()});
  }

  //MODIFICAR EJERCICIO
  modificarEjercicios(id: number, imagen: string, nombre: string, descripcion: string, series: number, repeticiones: string, tipo: string, musculo: string, intensidad: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/ejercicios/Modify/${id}`, { imagen: imagen, nombre: nombre, descripcion: descripcion, series: series, repeticiones: repeticiones, tipo: tipo, musculo: musculo, intensidad: intensidad }, {headers: this.getAuthHeaders()});
  }

  // MODIFICAR CAMPOS DE EJERCICIO
  modificarCampoEjercicios(id: number, body: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/ejercicios/ModifyCamp/${id}`, body, {headers: this.getAuthHeaders()});
  }

  //ELIMINAR EJERCICIO
  eliminarEjercicios(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/ejercicios/Delete/${id}`, {headers: this.getAuthHeaders()});
  }

  //====================================================================================================================
  //====================================================================================================================
  //====================================================================================================================

  //MOSTRAR EJERCICIOS ASIGNADOS
  mostrarEjerciciosAsignados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ejerciciosAsignados/All`);
  }

  //VER UN SOLO EJERCICIO ASIGNADO
  mostrarUnSoloEjerciciosAsignados(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ejerciciosAsignados/Only/${id}`);
  }

  //CREAR EJERCICIO ASIGNADO
  crearEjerciciosAsignados(idPlan: number, idEjer: number, idUsu: number, completado: Boolean): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ejerciciosAsignados/Create`, { idPlan: idPlan, idEjer: idEjer, idUsu: idUsu, completado: completado }, {headers: this.getAuthHeaders()});
  }

  //MODIFICAR EJERCICIO ASIGNADO
  modificarEjerciciosAsignados(id: number, idPlan: number, idEjer: number, idUsu: number, completado: Boolean): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/ejerciciosAsignados/Modify/${id}`, { idPlan: idPlan, idEjer: idEjer, idUsu: idUsu, completado: completado }, {headers: this.getAuthHeaders()});
  }

  // MODIFICAR CAMPOS DE EJERCICIO ASIGNADO
  modificarCampoEjerciciosAsignados(id: number, body: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/ejerciciosAsignados/ModifyCamp/${id}`, body, {headers: this.getAuthHeaders()});
  }

  //ELIMINAR EJERCICIO ASIGNADO
  eliminarEjerciciosAsignados(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/ejerciciosAsignados/Delete/${id}`, {headers: this.getAuthHeaders()});
  }

  //EJERCICIOS DE MI PLAN
  losEjerciciosDeMiPlan(idUsu: number, idPlan: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ejerciciosAsignados/SeeMy/${idUsu}/${idPlan}`, {headers: this.getAuthHeaders()});
  }

  //SELECIONAR CAMBIO DE EJERCICIO
  cambiarEjerciciosAsignados(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ejerciciosAsignados/Change/${id}`, {headers: this.getAuthHeaders()});
  }

  //ACTUALIZAR EJERCICIO
  actualizarEjerciciosAsignados(id: number, idNuevoEjercicio: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/ejerciciosAsignados/Update/${id}`, { idNuevoEjercicio: idNuevoEjercicio }, {headers: this.getAuthHeaders()});
  }

  //COMPLETAR EJERCICIO
  completarEjerciciosAsignados(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/ejerciciosAsignados/Complete/${id}`, {}, {headers: this.getAuthHeaders()});
  }
}
