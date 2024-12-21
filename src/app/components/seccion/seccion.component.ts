import { Component } from '@angular/core';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form.component';
import { SeccionFormServiceDirective } from '../../directives/seccion-form-service.directive';
import { DynamicFormField } from '../../dynamic-form/dynamicFormField';
import { TableColumn } from '../../dynamic-table/tableColumn';
// import { SeccionFormService } from '../../services/seccion-form.service';

@Component({
  selector: 'app-seccion',
  standalone: true,
  imports: [DynamicFormComponent, SeccionFormServiceDirective],
  templateUrl: './seccion.component.html',
  styleUrl: './seccion.component.css'
})
export class SeccionComponent {

  // constructor(public service: SeccionFormService) {}

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
    { field: 'name', header: 'Name' },
    { field: 'age', header: 'Age' },
    { field: 'email', header: 'Email' }
  ];

  data: any[] = [
    { name: 'John Doe', age: 28, email: 'john@example.com' },
    { name: 'Jane Doe', age: 26, email: 'jane@example.com' },
    { name: 'Alice Smith', age: 30, email: 'alice@example.com' }
  ];

}
