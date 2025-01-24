import { Component, OnInit } from '@angular/core';
// import { SeccionService } from '../seccion.service';
// import { Seccion } from '../models/seccion.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SeccionService } from '../../../services/seccion.service';
import { Seccion } from '../../../models/seccion';
import { CommonModule } from '@angular/common';
import { SeccionFormServiceDirective } from '../../../directives/seccion-form-service.directive';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-seccion-detail',
  standalone: true,
  imports: [
      CommonModule,
      // DynamicFormComponent,
      SeccionFormServiceDirective,
      // DynamicTableComponent
    ],
  templateUrl: './seccion-detail.component.html',
  styleUrl: './seccion-detail.component.css'
})
export class SeccionDetailComponent implements OnInit {
  // seccion!: Seccion;
  seccion$!: Observable<Seccion>;

  constructor(
    private seccionService: SeccionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    if (id) {
      let params = new HttpParams()
          .set('id', id);
      this.seccion$ = this.seccionService.getFromArray('', { params });
      this.seccion$.subscribe(seccion => {
        // this.populateForm(seccion);
        // this.seccion = data;
        console.log(seccion);
      });
    }
  }

  // initializeForm(): void {
  //   this.seccionForm = this.fb.group({
  //     idseccion: ['', Validators.required],
  //     orden: ['', Validators.required],
  //     type: ['', Validators.required],
  //     idpadre: [''],
  //     title: ['', Validators.required],
  //     content: ['', Validators.required],
  //     subsecciones: this.fb.array([]),
  //     cuentaMayor: ['']
  //   });
  // }

  // populateForm(seccion: Seccion): void {
  //   this.seccionForm.patchValue({
  //     idseccion: seccion.idseccion,
  //     orden: seccion.orden,
  //     type: seccion.type,
  //     idpadre: seccion.idpadre,
  //     title: seccion.title,
  //     content: seccion.content,
  //     cuentaMayor: seccion.cuentaMayor
  //   });

  //   // Populate subsecciones if they exist
  //   if (seccion.subsecciones && seccion.subsecciones.length > 0) {
  //     seccion.subsecciones.forEach(subseccion => this.addSubseccion(subseccion));
  //   }
  // }

  editSeccion(seccionid: number): void {
    this.router.navigate(['/secciones/edit', seccionid], { state: { seccionid } });
  }

  deleteSeccion(id: number): void {
    this.seccionService.delete(`${id}`).subscribe(() => {
      this.router.navigate(['/secciones']);
    });
  }
}