import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeccionService } from '../../../services/seccion.service';
import { Seccion } from '../../../models/seccion';
import { CommonModule } from '@angular/common';
import { SeccionFormServiceDirective } from '../../../directives/seccion-form-service.directive';

@Component({
  selector: 'app-seccion-form',
  standalone: true,
  imports: [
      CommonModule,
      // DynamicFormComponent,
      SeccionFormServiceDirective,
      ReactiveFormsModule,
      // DynamicTableComponent
    ],
  templateUrl: './seccion-form.component.html',
  styleUrl: './seccion-form.component.css'
})
export class SeccionFormComponent implements OnInit {
  seccionForm!: FormGroup;
  isEditMode = false;
  seccionId!: number;

  constructor(
    private fb: FormBuilder,
    private seccionService: SeccionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.seccionForm = this.fb.group({
      orden: ['', Validators.required],
      type: ['', Validators.required],
      idpadre: [''],
      title: ['', Validators.required],
      content: ['', Validators.required],
      cuentaMayor: ['']
    });

    // Check if in edit mode
    const state = history.state;
    if (state.seccion) {
      this.isEditMode = true;
      this.seccionId = state.seccion.idseccion;
      console.log(state.seccion);
      this.seccionForm.patchValue(state.seccion);
    }
  }

  onSubmit(): void {
    const seccion: Seccion = this.seccionForm.value;
    if (this.isEditMode) {
      seccion.idseccion = this.seccionId;
      this.seccionService.update(seccion).subscribe(() => {
        this.router.navigate(['/secciones']);
      });
    } else {
      this.seccionService.create(seccion).subscribe(() => {
        this.router.navigate(['/secciones']);
      });
    }
  }
}