import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-editar-perfil',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-perfil.html',
  styleUrl: './editar-perfil.css'
})
export class EditarPerfil implements OnInit {

  perfilForm: FormGroup;
  resumenActualizado: any = null;

  datosOriginales = {
    nombre: 'Erick Cárdenas',
    email: 'erick@gmail.com',
    edad: 28,
    telefono: '987654321',
    notificaciones: true
  };

  constructor(private fb: FormBuilder) {
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(1)]],
      telefono: [''],
      notificaciones: [false]
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.perfilForm.patchValue(this.datosOriginales);
  }

  guardar(): void {
    if (this.perfilForm.valid) {
      console.log('Datos actualizados:', this.perfilForm.value);
      this.resumenActualizado = this.perfilForm.value;
    } else {
      this.perfilForm.markAllAsTouched();
    }
  }

  restablecer(): void {
    this.perfilForm.patchValue(this.datosOriginales);
    this.resumenActualizado = null;
  }

  campoInvalido(campo: string): boolean {
    const control = this.perfilForm.get(campo);
    return !!control && control.invalid && control.touched;
  }
}