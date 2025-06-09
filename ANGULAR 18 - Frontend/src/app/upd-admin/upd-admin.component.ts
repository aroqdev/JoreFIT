import { Component } from '@angular/core';
import { Footer2Component } from "../footer2/footer2.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { contrasenaFuerte } from '../validators/contrasena-validator';
import { UsuariosService } from '../services/usuarios.service';
import { LocalService } from '../services/local.service';
import { Usuario } from '../interface/usuarios.interface';

@Component({
  selector: 'app-upd-admin',
  standalone: true,
  imports: [Footer2Component, RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './upd-admin.component.html',
  styleUrl: './upd-admin.component.css'
})
export class UpdAdminComponent {
  datos: FormGroup;
  contrasena: FormControl;
  repetirContrasena: FormControl;

  mensajeEstado: string = '';
  mensajeExito: string = '';

  coincidenContrasenas: boolean = false;

  usuario: Usuario;

  constructor(private usuarioService: UsuariosService, private localService: LocalService) {
    this.contrasena = new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8), contrasenaFuerte()]);
    this.repetirContrasena = new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8), contrasenaFuerte()]);

    this.datos = new FormGroup({
      contrasena: this.contrasena,
      repetirContrasena: this.repetirContrasena
    });

    this.usuario = this.localService.user!;
  }

  coincideContrasena() {
    if (this.datos.value.contrasena === this.datos.value.repetirContrasena) {
      this.coincidenContrasenas = true;
    } else {
      this.coincidenContrasenas = false;
    }
  }

  actualizarDatos() {
    const body: any = {}; // objeto dinámico

    if (this.datos.value.contrasena) body.contrasena = this.datos.value.contrasena;
    if (this.datos.value.repetirContrasena) body.repetirContrasena = this.datos.value.repetirContrasena;

    this.usuarioService.modificarCampoUser(this.localService.user!.id, body).subscribe({
      next: (data) => {
        console.log(data);
        this.localService.user = data.user;
        this.mensajeExito = 'Datos actualizados';
      },
      error: (err) => {
        console.error('Error al actualizar', err);
        this.mensajeEstado = 'Error al actualizar';
      }
    });
  }
}
