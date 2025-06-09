import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Usuario } from '../interface/usuarios.interface';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-footer2',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './footer2.component.html',
  styleUrl: './footer2.component.css'
})
export class Footer2Component {
  usuario: Usuario | null = null;

  constructor(private localService: LocalService) {}

  ngOnInit(): void {
    this.usuario = this.localService.user;
  }
  ngDoCheck(): void {
    this.usuario = this.localService.user;
  }
}
