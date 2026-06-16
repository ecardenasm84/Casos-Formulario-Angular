import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'app-registro-usuario',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-usuario.html',
  styleUrl: './registro-usuario.css'
})
export class RegistroUsuario {

  registroForm: FormGroup;
  mensajeConfirmacion: string = '';

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group(
      {
        nombreCompleto: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmarPassword: ['', Validators.required],
        terminos: [false, Validators.requiredTrue]
      },
      {
        validators: this.validarPasswords
      }
    );
  }

  validarPasswords(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmarPassword = control.get('confirmarPassword')?.value;

    if (password && confirmarPassword && password !== confirmarPassword) {
      return { passwordsNoCoinciden: true };
    }

    return null;
  }

  registrar(): void {
    if (this.registroForm.valid) {
      console.log('Datos registrados:', this.registroForm.value);
      this.mensajeConfirmacion = 'Usuario registrado correctamente.';
      this.registroForm.reset();
    } else {
      this.registroForm.markAllAsTouched();
      this.mensajeConfirmacion = '';
    }
  }

  campoInvalido(campo: string): boolean {
    const control = this.registroForm.get(campo);
    return !!control && control.invalid && control.touched;
  }
}