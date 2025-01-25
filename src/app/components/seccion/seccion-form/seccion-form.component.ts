import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SeccionService } from '../../../services/seccion.service';
import { Seccion } from '../../../models/seccion';
import { CommonModule } from '@angular/common';
import { SeccionFormServiceDirective } from '../../../directives/seccion-form-service.directive';
import { HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

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
  isLoading = false;
  seccionId!: string;
  seccion$!: Observable<Seccion>;

  constructor(
    private fb: FormBuilder,
    private seccionService: SeccionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // const state = history.state;
    // if (state.seccion) {
    //   this.isEditMode = true;
    //   this.seccionId = state.seccion.idseccion;
    //   console.log(state.seccion);
    //   this.seccionForm.patchValue(state.seccion);
    // }

    this.seccionId = this.route.snapshot.paramMap.get('id') || 'new';
    this.seccionForm = this.formGroup();
    console.log(this.seccionId);

    if (this.seccionId != null && this.seccionId != 'new') {
      this.isLoading = true;
      let params = new HttpParams()
          .set('id', this.seccionId);
      this.seccion$ = this.seccionService.getOne('/buscar', { params });
      this.seccion$.subscribe({
        next: seccion => {
          this.seccionForm = this.formGroup(seccion);
          seccion.subsecciones?.forEach(subseccion => this.subsecciones.push(this.formGroup(subseccion)));
        },
        complete: () => {this.isLoading = false;},
      });
    } //else this.seccion$ = of(true);
  }

  loadSubsecciones(subsecciones: Seccion[]): void {
    const subseccionesFormArray = this.seccionForm.get('subsecciones') as FormArray;
    subsecciones.forEach(subseccion => subseccionesFormArray.push(this.formGroup(subseccion)));
  }

  onSubmit(): void {
    // const seccion: Seccion = this.seccionForm.value;
    // if (this.isEditMode) {
    //   seccion.idseccion = this.seccionId;
    //   this.seccionService.update(seccion).subscribe(() => {
    //     this.router.navigate(['/secciones']);
    //   });
    // } else {
    //   this.seccionService.create(seccion).subscribe(() => {
    //     this.router.navigate(['/secciones']);
    //   });
    // }
    // if (this.seccionForm.valid) {
      console.log(this.seccionForm.value);
    // } else {
    //   console.log('Form is not valid');
    // }
  }

  get subsecciones(): FormArray {
    return this.seccionForm.get('subsecciones') as FormArray;
  }

  formGroup(subseccion?: Seccion): FormGroup {
    return this.fb.group({
      idseccion: [subseccion?.idseccion || '', Validators.required],
      orden: [subseccion?.orden || '', Validators.required],
      type: [subseccion?.type || '', Validators.required],
      idpadre: [subseccion?.idpadre || ''],
      title: [subseccion?.title || '', Validators.required],
      content: [subseccion?.content || '', Validators.required],
      subsecciones: this.fb.array([]),
      cuentaMayor: [subseccion?.cuentaMayor || '']
    });
  }
  
  addSubseccion(subseccion?: Seccion): void {
    const subseccionFormGroup = this.formGroup(subseccion);

    this.subsecciones.push(subseccionFormGroup);
  }

  removeSubseccion(index: number): void {
    this.subsecciones.removeAt(index);
  }

}