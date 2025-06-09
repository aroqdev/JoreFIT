import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LocalService } from '../../services/local.service';
import { PlanesService } from '../../services/planes.service';
import { Planes } from '../../interface/planes.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-card.component.html',
  styleUrl: './add-card.component.css'
})
export class AddCardComponent {
  tarjeta: FormGroup;
  nombre: FormControl;
  numero: FormControl;
  vencimiento: FormControl;
  codigo: FormControl;

  selectedPlan?: Planes;

  constructor(private route: ActivatedRoute, private router: Router, private usuarioService: UsuariosService,
    private planesService: PlanesService, private localService: LocalService) {
      this.nombre = new FormControl('', [Validators.required, Validators.maxLength(100)]);
      this.numero = new FormControl('', [Validators.required, Validators.maxLength(16)]);
      this.vencimiento = new FormControl('', [Validators.required]);
      this.codigo = new FormControl('', [Validators.required, Validators.maxLength(3)]);
  
      this.tarjeta = new FormGroup({
        nombre: this.nombre,
        numero: this.numero,
        vencimiento: this.vencimiento,
        codigo: this.codigo
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
    const body: any = {}; // Objeto dinámico

    if (this.tarjeta.value.nombre) body.nombre_titular = this.tarjeta.value.nombre;
    if (this.tarjeta.value.numero) body.numero_tarjeta = this.tarjeta.value.numero;
    if (this.tarjeta.value.vencimiento) body.fecha_vencimiento = this.tarjeta.value.vencimiento;
    if (this.tarjeta.value.codigo) body.cvv = this.tarjeta.value.codigo;

    this.usuarioService.modificarCampoUser(this.localService.user!.id, body).subscribe({
      next: (data) => {
        console.log('Tarjeta actualizada', data);
        this.localService.user = data.user;
        this.router.navigate(['/profile/pago', this.selectedPlan?.nombre]); // Ruta tras actualizar
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }
}
