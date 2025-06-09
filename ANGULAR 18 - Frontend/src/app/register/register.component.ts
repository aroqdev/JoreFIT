import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Footer2Component } from "../footer2/footer2.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { correoExisteValidator } from '../validators/verificarCorreo-validator';
import { contrasenaFuerte } from '../validators/contrasena-validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, Footer2Component, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registro: FormGroup;
  nombre: FormControl;
  apellido: FormControl;
  correo: FormControl;
  contrasena: FormControl;
  repetirContrasena: FormControl;
  fecha_nacimiento: FormControl;
  pesoActual: FormControl;
  pesoObjetivo: FormControl;
  nivel: FormControl;

  rol: string = 'Usuario';
  mensajeEstado: string = '';

  coincidenContrasenas: boolean = false;

  constructor(private usuarioService: UsuariosService, private router: Router) {
    this.nombre = new FormControl('', [Validators.required, Validators.maxLength(100)]);
    this.apellido = new FormControl('', [Validators.required, Validators.maxLength(100)]);
    this.correo = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100), correoExisteValidator(this.usuarioService)]);
    this.contrasena = new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8), contrasenaFuerte()]);
    this.repetirContrasena = new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8), contrasenaFuerte()]);
    this.fecha_nacimiento = new FormControl('', [Validators.required]);
    this.pesoActual = new FormControl('', [Validators.required]);
    this.pesoObjetivo = new FormControl('', [Validators.required]);
    this.nivel = new FormControl('', [Validators.required]);

    this.registro = new FormGroup({
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      contrasena: this.contrasena,
      repetirContrasena: this.repetirContrasena,
      fecha_nacimiento: this.fecha_nacimiento,
      pesoActual: this.pesoActual,
      pesoObjetivo: this.pesoObjetivo,
      nivel: this.nivel
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
    this.usuarioService.registerUser(this.registro.value.nombre, this.registro.value.apellido, this.registro.value.correo, this.registro.value.contrasena, this.registro.value.fecha_nacimiento, this.registro.value.pesoActual, this.registro.value.pesoObjetivo, this.registro.value.nivel, this.rol).subscribe({
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
