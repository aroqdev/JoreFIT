import { Injectable } from '@angular/core';
import { Usuario } from '../interface/usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private readonly key = 'user';

  set user(usuario: Usuario | null) {
    if (usuario) {
      localStorage.setItem(this.key, JSON.stringify(usuario));
    } else {
      localStorage.removeItem(this.key);
      localStorage.removeItem('authToken');
    }
  }

  get user(): Usuario | null {
    const userJson = localStorage.getItem(this.key);
    return userJson ? JSON.parse(userJson) as Usuario : null;
  }

  get token(): string | null {
    return localStorage.getItem('authToken'); // Ahora el token es independiente
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem('authToken');
  }
}
