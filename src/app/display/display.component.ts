import { Component, Input } from '@angular/core';
import { DynamicFormField } from '../dynamic-form/dynamicFormField';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { TableColumn } from '../dynamic-table/tableColumn';
import { DynamicTableComponent } from '../dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [DynamicFormComponent, DynamicTableComponent],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent {
  @Input() content: string = '';

  fields: DynamicFormField[] = [
    { type: 'text', label: 'First Name', name: 'firstName' },
    { type: 'text', label: 'Last Name', name: 'lastName' },
    { type: 'select', label: 'Country', name: 'country', options: ['USA', 'Canada', 'UK'] },
    { type: 'radio', label: 'Gender', name: 'gender', options: ['Male', 'Female'] }
  ];

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
