import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Usuario } from '../interface/usuarios.interface';
import { UsuariosService } from '../services/usuarios.service';
import { Footer2Component } from '../footer2/footer2.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [RouterLink, Footer2Component, CommonModule, FormsModule],
  templateUrl: './user-admin.component.html',
  styleUrl: './user-admin.component.css'
})
export class UserAdminComponent {
  filtroUsuario: string = '';

  usuarios: any[] = [];

  mensajeEstado: string = '';
  mensajeExito: string = '';

  constructor(private userService: UsuariosService) {}

  ngOnInit() {
    this.userService.mostrarUser().subscribe({
      next: (data) => {
        console.log(data);
        this.usuarios = data.users;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }

  eliminar (id: number) {
    this.userService.eliminarUser(id).subscribe({
      next: (data) => {
        console.log(data);
        this.mensajeExito = 'Usuario eliminado';
        this.actualizar();
      },
      error: (err) => {
        console.error('Error', err);
        this.mensajeEstado = 'Error al eliminar';
      }
    });
  }

  actualizar() {
    this.userService.mostrarUser().subscribe({
      next: (data) => {
        console.log(data);
        this.usuarios = data.users;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }
}
