import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Footer2Component } from "../footer2/footer2.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { LocalService } from '../services/local.service';
import { correoNoExisteValidator } from '../validators/validarCorreo-validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, Footer2Component, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login: FormGroup;
  correo: FormControl;
  contrasena: FormControl;

  mensajeEstado: string = '';

  constructor(private usuarioService: UsuariosService, private localService: LocalService, private router: Router) {
    this.correo = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100), correoNoExisteValidator(this.usuarioService)]);
    this.contrasena = new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8)]);

    this.login = new FormGroup({
      correo: this.correo,
      contrasena: this.contrasena,
    });
  }

  loginUser() {
    this.usuarioService.loginUser(this.login.value.correo, this.login.value.contrasena).subscribe({
      next: (data) => {
        console.log(data);
        this.localService.user = data.user;
        localStorage.setItem('authToken', data.token);
        if (this.localService.user?.rol == 'Administrador') {
          this.router.navigate(['/profile/admin']);
        }
        else {
          this.router.navigate(['/profile']);
        }
      },
      error: (err) => {
        console.error('Error al iniciar sesion', err);
        this.mensajeEstado = 'Error al iniciar sesion';
      }
    });
  }
}
