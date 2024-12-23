import { Component, OnInit } from '@angular/core';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form.component';
import { SeccionFormServiceDirective } from '../../directives/seccion-form-service.directive';
import { DynamicFormField } from '../../dynamic-form/dynamicFormField';
import { TableColumn } from '../../dynamic-table/tableColumn';
import { DynamicTableComponent } from '../../dynamic-table/dynamic-table.component';
import { SeccionFormService } from '../../services/seccion-form.service';
import { SeccionService } from '../../services/seccion.service';
import { Seccion } from '../../models/seccion';
import { Observable, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-seccion',
  standalone: true,
  imports: [
    CommonModule,
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

  columns: TableColumn[] = [
    { field: 'title', header: 'Title' },
    { field: 'content', header: 'Content' },
  ];

  data$!: Observable<Seccion[]>;
  isLoading$!: Observable<boolean>;

  constructor(public formService: SeccionFormService, public seccionService: SeccionService) {}

  ngOnInit(): void {
    this.seccionService.setApiUrl(environment.apiUrl + '/seccion/v1');
    if (this.seccionService.getCurrentItems() == null || this.seccionService.getCurrentItems().length < 1) {
      this.loadData();
    }
    this.data$ = this.seccionService.items$;
    this.isLoading$ = this.seccionService.isLoading$;
  }

  loadData() {
    this.seccionService.getAll().pipe(take(1)).subscribe();
  }

}
