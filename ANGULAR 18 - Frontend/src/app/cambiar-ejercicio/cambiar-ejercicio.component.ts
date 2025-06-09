import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Footer2Component } from "../footer2/footer2.component";
import { Ejercicios } from '../interface/ejercicios.interface';
import { EjerciciosService } from '../services/ejercicios.service';

@Component({
  selector: 'app-cambiar-ejercicio',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, Footer2Component],
  templateUrl: './cambiar-ejercicio.component.html',
  styleUrl: './cambiar-ejercicio.component.css'
})
export class CambiarEjercicioComponent {
  ejercicio!: any;
  cambiarEjercicios: any[] = [];

  mensajeEstado: string = '';
  
  constructor(private route: ActivatedRoute, private router: Router,
    private ejercicioService: EjerciciosService) {}

  ngOnInit(): void {
    const planId = this.route.snapshot.params['planId'];

    this.ejercicioService.mostrarUnSoloEjerciciosAsignados(planId).subscribe({
      next: (data) => {
        console.log(data);
        this.ejercicio = data.ejercicioAsignado;
        this.ejercicioService.cambiarEjerciciosAsignados(planId).subscribe({
          next: (data) => {
            console.log(data);
            this.cambiarEjercicios  = data.ejerciciosDisponibles;
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

  cambiar(id: number) {
    this.ejercicioService.actualizarEjerciciosAsignados(this.ejercicio.id, id).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/profile', this.ejercicio.idPlan]);
      },
      error: (err) => {
        console.error('Error', err);
        this.mensajeEstado = 'Este ejercicio ya está asignado en el plan actual.';
      }
    });
  }
}
