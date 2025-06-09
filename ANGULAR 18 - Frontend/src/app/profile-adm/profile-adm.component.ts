import { Component } from '@angular/core';
import { Footer2Component } from "../footer2/footer2.component";
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../interface/usuarios.interface';
import { LocalService } from '../services/local.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { PlanesService } from '../services/planes.service';
import { correoExisteValidator } from '../validators/verificarCorreo-validator';
import { contrasenaFuerte } from '../validators/contrasena-validator';

@Component({
  selector: 'app-profile-adm',
  standalone: true,
  imports: [Footer2Component, RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile-adm.component.html',
  styleUrl: './profile-adm.component.css'
})
export class ProfileAdmComponent {
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
  mensajeEstadoUser: string = '';

  coincidenContrasenas: boolean = false;

  registroPlan: FormGroup;
  imagen: FormControl;
  nombrePlan: FormControl;
  descripcion: FormControl;
  duracion: FormControl;
  precio: FormControl;

  mensajeEstadoPlan: string = '';

  usuario!: Usuario;
  
  constructor(private localService: LocalService, private router: Router,
    private usuarioService: UsuariosService, private planesService: PlanesService
  ) {
      this.nombre = new FormControl('', [Validators.required, Validators.maxLength(100)]);
      this.apellido = new FormControl('', [Validators.required, Validators.maxLength(100)]);
      this.correo = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100), correoExisteValidator(this.usuarioService)]);
      this.contrasena = new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8), contrasenaFuerte()]);
      this.repetirContrasena = new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8), contrasenaFuerte()]);
      this.fecha_nacimiento = new FormControl('', [Validators.required]);
      this.pesoActual = new FormControl('', [Validators.required]);
      this.pesoObjetivo = new FormControl('', [Validators.required]);
      this.nivel = new FormControl('', [Validators.required]);

      this.imagen = new FormControl('', [Validators.required, Validators.maxLength(255)]);
      this.nombrePlan = new FormControl('', [Validators.required, Validators.maxLength(255)]);
      this.descripcion = new FormControl('', [Validators.required, Validators.maxLength(100)]);
      this.duracion = new FormControl('', [Validators.required]);
      this.precio = new FormControl('', [Validators.required]);

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

      this.registroPlan = new FormGroup({
        imagen: this.imagen,
        nombrePlan: this.nombrePlan,
        descripcion: this.descripcion,
        duracion: this.duracion,
        precio: this.precio
      });
  }

  ngOnInit(): void {
    this.usuario = this.localService.user!;
  }

  coincideContrasena() {
    if (this.registro.value.contrasena === this.registro.value.repetirContrasena) {
      this.coincidenContrasenas = true;
    } else {
      this.coincidenContrasenas = false;
    }
  }

  logout() {
    this.usuarioService.Logout().subscribe({
      next: (data) => {
        console.log(data);
        this.localService.logout();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }

  registerUser() {
    this.usuarioService.registerUser(this.registro.value.nombre, this.registro.value.apellido, this.registro.value.correo, this.registro.value.contrasena, this.registro.value.fecha_nacimiento, this.registro.value.pesoActual, this.registro.value.pesoObjetivo, this.registro.value.nivel, this.rol).subscribe({
      next: (data) => {
        console.log(data);
        this.mensajeEstadoUser = 'Usuario registrado';
      },
      error: (err) => {
        console.error('Error al registrar', err);
        this.mensajeEstadoUser = 'Error al registrar';
      }
    });
  }

  registerPlan() {
    this.planesService.crearPlan(this.registroPlan.value.imagen, this.registroPlan.value.nombrePlan, this.registroPlan.value.descripcion, this.registroPlan.value.duracion, this.registroPlan.value.precio).subscribe({
      next: (data) => {
        console.log(data);
        this.mensajeEstadoPlan = 'Plan registrado';
      },
      error: (err) => {
        console.error('Error al registrar', err);
        this.mensajeEstadoPlan = 'Error al registrar';
      }
    });
  }
}
