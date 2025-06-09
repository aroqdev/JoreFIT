import { Component } from '@angular/core';
import { Footer2Component } from "../footer2/footer2.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { LocalService } from '../services/local.service';
import { contrasenaFuerte } from '../validators/contrasena-validator';
import { Usuario } from '../interface/usuarios.interface';

@Component({
  selector: 'app-upd-usr',
  standalone: true,
  imports: [Footer2Component, CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './upd-usr.component.html',
  styleUrl: './upd-usr.component.css'
})
export class UpdUsrComponent {
  datos: FormGroup;
  nombre: FormControl;
  apellido: FormControl;
  correo: FormControl;
  contrasena: FormControl;
  repetirContrasena: FormControl;
  fecha_nacimiento: FormControl;

  personalData: FormGroup;
  altura: FormControl;
  pesoActual: FormControl;
  pesoObjetivo: FormControl;
  nivel: FormControl;

  mensajeEstado: string = '';
  mensajeExito: string = '';

  coincidenContrasenas: boolean = false;
  usuario: Usuario;

  constructor(private usuarioService: UsuariosService, private localService: LocalService) {
    this.nombre = new FormControl('', [Validators.maxLength(100)]);
    this.apellido = new FormControl('', [Validators.maxLength(100)]);
    this.correo = new FormControl('', [Validators.email, Validators.maxLength(100)]);
    this.contrasena = new FormControl('', [Validators.maxLength(16), Validators.minLength(8), contrasenaFuerte()]);
    this.repetirContrasena = new FormControl('', [Validators.maxLength(16), Validators.minLength(8), contrasenaFuerte()]);
    this.fecha_nacimiento = new FormControl('');

    this.altura = new FormControl('');
    this.pesoActual = new FormControl('');
    this.pesoObjetivo = new FormControl('');
    this.nivel = new FormControl('');

    this.datos = new FormGroup({
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      contrasena: this.contrasena,
      repetirContrasena: this.repetirContrasena,
      fecha_nacimiento: this.fecha_nacimiento
    });

    this.personalData = new FormGroup({
      altura: this.altura,
      pesoActual: this.pesoActual,
      pesoObjetivo: this.pesoObjetivo,
      nivel: this.nivel
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

    if (this.datos.value.nombre) body.nombre = this.datos.value.nombre;
    if (this.datos.value.apellido) body.apellido = this.datos.value.apellido;
    if (this.datos.value.correo) body.correo = this.datos.value.correo;
    if (this.datos.value.contrasena) body.contrasena = this.datos.value.contrasena;
    if (this.datos.value.repetirContrasena) body.repetirContrasena = this.datos.value.repetirContrasena;
    if (this.datos.value.fecha_nacimiento) body.fecha_nacimiento = this.datos.value.fecha_nacimiento;

    this.usuarioService.modificarCampoUser(this.localService.user!.id, body).subscribe({
      next: (data) => {
        console.log(data);
        this.mensajeExito = 'Datos actualizados';
        this.localService.user = data.user;
      },
      error: (err) => {
        console.error('Error al actualizar', err);
        this.mensajeEstado = 'Error al actualizar';
      }
    });
  }

  actualizarData() {
    const body: any = {}; // objeto dinámico

    if (this.personalData.value.altura) body.altura = this.personalData.value.altura;
    if (this.personalData.value.pesoActual) body.pesoActual = this.personalData.value.pesoActual;
    if (this.personalData.value.pesoObjetivo) body.pesoObjetivo = this.personalData.value.pesoObjetivo;
    if (this.personalData.value.nivel) body.nivel = this.personalData.value.nivel;

    this.usuarioService.modificarCampoUser(this.localService.user!.id, body).subscribe({
      next: (data) => {
        console.log(data);
        this.mensajeExito = 'Datos actualizados';

      },
      error: (err) => {
        console.error('Error al actualizar', err);
        this.mensajeEstado = 'Error al actualizar';
      }
    });
  }
}
