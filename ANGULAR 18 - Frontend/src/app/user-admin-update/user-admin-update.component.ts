import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../interface/usuarios.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { contrasenaFuerte } from '../validators/contrasena-validator';
import { Footer2Component } from "../footer2/footer2.component";

@Component({
  selector: 'app-user-admin-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Footer2Component, RouterLink],
  templateUrl: './user-admin-update.component.html',
  styleUrl: './user-admin-update.component.css'
})
export class UserAdminUpdateComponent {
  update: FormGroup;
  nombre: FormControl;
  apellido: FormControl;
  correo: FormControl;
  contrasena: FormControl;
  repetirContrasena: FormControl;
  fecha_nacimiento: FormControl;
  altura: FormControl;
  pesoActual: FormControl;
  pesoObjetivo: FormControl;
  nivel: FormControl;

  usuario!: Usuario;

  mensajeEstado: string = '';
  mensajeExito: string = '';

  coincidenContrasenas: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private usuarioService: UsuariosService) {
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

    this.update = new FormGroup({
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      contrasena: this.contrasena,
      repetirContrasena: this.repetirContrasena,
      fecha_nacimiento: this.fecha_nacimiento,
      altura: this.altura,
      pesoActual: this.pesoActual,
      pesoObjetivo: this.pesoObjetivo,
      nivel: this.nivel
    });
  }

  coincideContrasena() {
    if (this.update.value.contrasena === this.update.value.repetirContrasena) {
      this.coincidenContrasenas = true;
    } else {
      this.coincidenContrasenas = false;
    }
  }

  ngOnInit() {
    const planId = this.route.snapshot.params['userId'];

    this.usuarioService.mostrarUnSoloUser(planId).subscribe({
      next: (data) => {
        console.log(data);
        this.usuario = data.user;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }

  actualizar() {
    const body: any = {}; // objeto dinámico

    if (this.update.value.nombre) body.nombre = this.update.value.nombre;
    if (this.update.value.apellido) body.apellido = this.update.value.apellido;
    if (this.update.value.correo) body.correo = this.update.value.correo;
    if (this.update.value.contrasena) body.contrasena = this.update.value.contrasena;
    if (this.update.value.repetirContrasena) body.repetirContrasena = this.update.value.repetirContrasena;
    if (this.update.value.fecha_nacimiento) body.fecha_nacimiento = this.update.value.fecha_nacimiento;
    if (this.update.value.altura) body.altura = this.update.value.altura;
    if (this.update.value.pesoActual) body.pesoActual = this.update.value.pesoActual;
    if (this.update.value.pesoObjetivo) body.pesoObjetivo = this.update.value.pesoObjetivo;
    if (this.update.value.nivel) body.nivel = this.update.value.nivel;

    this.usuarioService.modificarCampoUser(this.usuario.id, body).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/admin/users']);
      },
      error: (err) => {
        console.error('Error', err);
        this.mensajeEstado = 'Error al actualizar';
      }
    });
  }
}
