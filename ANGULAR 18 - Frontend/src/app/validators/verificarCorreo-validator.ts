import { AbstractControl, ValidatorFn } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';

export function correoExisteValidator(usuarioService: UsuariosService): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const correo = control.value;
    if (!correo) return null;

    usuarioService.verificarCorreo(correo).subscribe({
      next: () => control.setErrors({ correoExiste: true }), // Si la API responde 200, el correo EXISTE y la validación pasa.
      error: () => control.setErrors(null) // Si la API responde 404, el correo NO existe y muestra error.
    });

    return null;
  };
}
