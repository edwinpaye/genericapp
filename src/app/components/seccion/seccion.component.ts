import { Component, OnInit } from '@angular/core';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form.component';
import { SeccionFormServiceDirective } from '../../directives/seccion-form-service.directive';
import { DynamicFormField } from '../../dynamic-form/dynamicFormField';
import { TableColumn } from '../../dynamic-table/tableColumn';
import { DynamicTableComponent } from '../../dynamic-table/dynamic-table.component';
import { SeccionFormService } from '../../services/seccion-form.service';
import { SeccionService } from '../../services/seccion.service';
import { Seccion } from '../../models/seccion';
// import { SeccionFormService } from '../../services/seccion-form.service';

@Component({
  selector: 'app-seccion',
  standalone: true,
  imports: [
    DynamicFormComponent,
    SeccionFormServiceDirective,
    DynamicTableComponent
  ],
  templateUrl: './seccion.component.html',
  styleUrl: './seccion.component.css'
})
export class SeccionComponent implements OnInit {

  fields: DynamicFormField[] = [
    { type: 'text', label: 'Title', name: 'titulo' },
    { type: 'text', label: 'Content', name: 'contenido' },
    // { type: 'select', label: 'Country', name: 'country', options: ['USA', 'Canada', 'UK'] },
    // { type: 'radio', label: 'Gender', name: 'gender', options: ['Male', 'Female'] }
  ];
  // orden: number;
  // type: number;
  // idpadre: number;
  // subsecciones: Seccion[];
  // cuentaMayor: any;

  columns: TableColumn[] = [
    { field: 'title', header: 'Title' },
    { field: 'content', header: 'Content' },
    // { field: 'email', header: 'Email' }
  ];

  data: Seccion[] = [];

  constructor(public formService: SeccionFormService, public seccionService: SeccionService) {}

  ngOnInit(): void {
    this.seccionService.getAll().subscribe({
      next: res => this.data = (res as any).ENTITY
    })
  }

}
