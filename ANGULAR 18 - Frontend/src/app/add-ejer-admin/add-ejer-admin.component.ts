import { Component } from '@angular/core';
import { EjerciciosService } from '../services/ejercicios.service';
import { PlanesService } from '../services/planes.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Planes } from '../interface/planes.interface';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-ejer-admin',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-ejer-admin.component.html',
  styleUrl: './add-ejer-admin.component.css'
})
export class AddEjerAdminComponent {
  selectedPlan?: Planes;

  register: FormGroup;
  imagen: FormControl;
  nombres: FormControl;
  descripcion: FormControl;
  series: FormControl;
  repeticiones: FormControl;
  musculo: FormControl;
  intensidad: FormControl;

  mensajeEstado: string = '';

  constructor(private route: ActivatedRoute, private router: Router,
    private planesService: PlanesService, private ejercicioService: EjerciciosService) {
      this.imagen = new FormControl('', [Validators.required, Validators.maxLength(255)]);
      this.nombres = new FormControl('', [Validators.required, Validators.maxLength(255)]);
      this.descripcion = new FormControl('', [Validators.required, Validators.maxLength(255)]);
      this.series = new FormControl('', [Validators.required]);
      this.repeticiones = new FormControl('', [Validators.required, Validators.maxLength(255)]);
      this.musculo = new FormControl('', [Validators.required]);
      this.intensidad = new FormControl('', [Validators.required]);

      this.register = new FormGroup({
        imagen: this.imagen,
        nombres: this.nombres,
        descripcion: this.descripcion,
        series: this.series,
        repeticiones: this.repeticiones,
        musculo: this.musculo,
        intensidad: this.intensidad
      });
    }

  ngOnInit(): void {
    const planId = this.route.snapshot.params['planId'];

    this.planesService.mostrarUnSoloPlan(planId).subscribe({
      next: (data) => {
        console.log(data);
        this.selectedPlan = data.plan;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }

  guardar() {
    this.ejercicioService.crearEjercicios(this.register.value.imagen, this.register.value.nombres, this.register.value.descripcion, this.register.value.series, this.register.value.repeticiones, this.selectedPlan!.nombre, this.register.value.musculo, this.register.value.intensidad).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/admin/plans/', this.selectedPlan?.nombre]);
      },
      error: (err) => {
        console.error('Error', err);
        this.mensajeEstado = 'Error al actualizar';
      }
    });
  }
}
