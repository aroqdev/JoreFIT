import { Component } from '@angular/core';
import { Usuario } from '../interface/usuarios.interface';
import { UsuariosService } from '../services/usuarios.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PlanesService } from '../services/planes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Footer2Component } from '../footer2/footer2.component';

@Component({
  selector: 'app-plan-asig-admin',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, Footer2Component],
  templateUrl: './plan-asig-admin.component.html',
  styleUrl: './plan-asig-admin.component.css'
})
export class PlanAsigAdminComponent {
  usuario!: Usuario;
  planesAsig: any[] = [];

  mensajeEstado: string = '';
  mensajeExito: string = '';

  constructor(private route: ActivatedRoute, private router: Router,
    private usuarioSerice: UsuariosService, private planesService: PlanesService) {}

  ngOnInit(): void {
    const planId = this.route.snapshot.params['userId'];

    this.usuarioSerice.mostrarUnSoloUser(planId).subscribe({
      next: (data) => {
        console.log(data);
        this.usuario = data.user;
        this.planesService.misPlanes(this.usuario.id).subscribe({
          next: (data) => {
            console.log(data);
            this.planesAsig = data.planesAsignados;
          },
          error: (err) => {
            console.error('Error', err);
          }
        });
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }

  eliminar(id: number) {
    this.planesService.eliminarPlanesAsignados(id).subscribe({
      next: (data) => {
        console.log(data);
        this.mensajeExito = 'Plan eliminado';
        this.actualizar();
      },
      error: (err) => {
        console.error('Error', err);
        this.mensajeEstado = 'Error al eliminar';
      }
    });
  }

  actualizar() {
    this.planesService.misPlanes(this.usuario.id).subscribe({
      next: (data) => {
        console.log(data);
        this.planesAsig = data.planesAsignados;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }
}
