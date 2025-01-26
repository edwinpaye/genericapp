import { Component, OnInit } from '@angular/core';
import { Seccion } from '../../../models/seccion';
import { SeccionService } from '../../../services/seccion.service';
import { SeccionFormService } from '../../../services/seccion-form.service';
import { CommonModule } from '@angular/common';
import { SeccionFormServiceDirective } from '../../../directives/seccion-form-service.directive';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-seccion-list',
  standalone: true,
  imports: [
    CommonModule,
    // DynamicFormComponent,
    SeccionFormServiceDirective,
    RouterModule,
    // DynamicTableComponent
  ],
  templateUrl: './seccion-list.component.html',
  styleUrl: './seccion-list.component.css'
})
export class SeccionListComponent implements OnInit {
  secciones: Seccion[] = [];

  // constructor(private seccionService: SeccionService) {}
  constructor(public formService: SeccionFormService, public seccionService: SeccionService) {}

  ngOnInit(): void {
    if (this.seccionService.getLoadingState()) {
      this.seccionService.items$.subscribe({
        next: secciones => this.secciones = secciones,
      })
    } else if (this.seccionService.getCurrentItems().length > 0) 
      this.secciones = this.seccionService.getCurrentItems();
    else this.loadSecciones();
  }

  loadSecciones(): void {
    this.seccionService.getAll().subscribe(data => {
      this.secciones = data;
    });
  }

  deleteSeccion(id: number): void {
    // this.seccionService.delete(`${id}`).subscribe(() => {
    //   this.loadSecciones();
    // });
  }

}
