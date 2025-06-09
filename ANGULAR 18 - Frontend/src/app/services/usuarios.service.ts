import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

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

  //MOSTRAR USUARIOS
  mostrarUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/All`);
  }

  //VER UN SOLO USUARIO
  mostrarUnSoloUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/Only/${id}`);
  }

  //LOGIN, REGISTRO, RECUPERAR CONTRASEÑA
  verificarCorreo(correo: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/VerifyEmail`, { correo });
  }

  //REGISTER
  registerUser(nombre: string, apellido: string, correo: string, contrasena: string, fecha_nacimiento: Date, pesoActual: number, pesoObjetivo: number, nivel: string, rol: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/Create`, { nombre: nombre, apellido: apellido, correo: correo, contrasena: contrasena, fecha_nacimiento: fecha_nacimiento, pesoActual: pesoActual, pesoObjetivo: pesoObjetivo, nivel: nivel, rol: rol });
  }

  //LOGIN
  loginUser(correo: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/Login`, { correo: correo, contrasena: contrasena });
  }

  //RECUPERAR CONTRASEÑA
  enviarCodigo(correo: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/SendCode`, { correo: correo });
  }
  verificarCodigo(correo: string, code: string | null): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/VerifyCode`, { correo: correo, code: code } );
  }
  verificarContrasena(correo: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/VerifyPassword`, { correo: correo, contrasena: contrasena });
  }
  cambiarContrasena(correo: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/ChangePassword`, { correo: correo, contrasena: contrasena });
  }

  //MODIFICAR USUARIO
  modificarUser(id: number, nombre: string, apellido: string, correo: string, contrasena: string, fecha_nacimiento: Date, pesoActual: number, pesoObjetivo: number, nivel: string, rol: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/user/Modify/${id}`, { nombre: nombre, apellido: apellido, correo: correo, contrasena: contrasena, fecha_nacimiento: fecha_nacimiento, pesoActual: pesoActual, pesoObjetivo: pesoObjetivo, nivel: nivel, rol: rol });
  }

  // MODIFICAR CAMPOS DE USUARIO
  modificarCampoUser(id: number, body: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/user/ModifyCamp/${id}`, body);
  }

  //ELIMINAR USUARIO
  eliminarUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/user/Delete/${id}`, {headers: this.getAuthHeaders()});
  }

  //CERRAR SESION
  Logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/Logout`, {}, {headers: this.getAuthHeaders()});
  }
}
