import { Component } from '@angular/core';
import { Footer2Component } from "../footer2/footer2.component";
import { Router, RouterLink } from '@angular/router';
import { LocalService } from '../services/local.service';
import { PlanesService } from '../services/planes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [Footer2Component, RouterLink, CommonModule, FormsModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  usuario!: any;
  misPlanes: any[] = [];

  constructor(private planesServices: PlanesService, private usuarioService: UsuariosService, private localService: LocalService, private router: Router){}

  ngOnInit(): void {
    this.usuario = this.localService.user!;
    this.planesServices.misPlanes(this.localService.user!.id).subscribe({
      next: (data) => {
        console.log(data);
        this.misPlanes = data.planesAsignados;
        this.todosPlanesCompletados();
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }

  // Función que evalúa si todos los planes están completados
  todosPlanesCompletados(): boolean {
    return this.misPlanes && this.misPlanes.length > 0 && this.misPlanes.every(plan => plan.completado);
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
}
