import { Component } from '@angular/core';
import { Footer2Component } from "../footer2/footer2.component";
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { correoExisteValidator } from '../validators/verificarCorreo-validator';
import { contrasenaFuerte } from '../validators/contrasena-validator';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [Footer2Component, RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent {
  registro: FormGroup;
  nombre: FormControl;
  apellido: FormControl;
  correo: FormControl;
  contrasena: FormControl;
  repetirContrasena: FormControl;
  fecha_nacimiento: FormControl;

  pesoActual: number = 1;
  pesoObjetivo: number = 1;
  nivel: string = 'Avanzado';
  rol: string = 'Administrador';

  mensajeEstado: string = '';

  coincidenContrasenas: boolean = false;

  constructor(private usuarioService: UsuariosService, private router: Router) {
    this.nombre = new FormControl('', [Validators.required, Validators.maxLength(100)]);
    this.apellido = new FormControl('', [Validators.required, Validators.maxLength(100)]);
    this.correo = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100), correoExisteValidator(this.usuarioService)]);
    this.contrasena = new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8), contrasenaFuerte()]);
    this.repetirContrasena = new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8), contrasenaFuerte()]);
    this.fecha_nacimiento = new FormControl('', [Validators.required]);

    this.registro = new FormGroup({
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      contrasena: this.contrasena,
      repetirContrasena: this.repetirContrasena,
      fecha_nacimiento: this.fecha_nacimiento
    });
  }

  coincideContrasena() {
    if (this.registro.value.contrasena === this.registro.value.repetirContrasena) {
      this.coincidenContrasenas = true;
    } else {
      this.coincidenContrasenas = false;
    }
  }

  registerUser() {
    this.usuarioService.registerUser(this.registro.value.nombre, this.registro.value.apellido, this.registro.value.correo, this.registro.value.contrasena, this.registro.value.fecha_nacimiento, this.pesoActual, this.pesoObjetivo, this.nivel, this.rol).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar', err);
        this.mensajeEstado = 'Error al registrar';
      }
    });
  }
}
