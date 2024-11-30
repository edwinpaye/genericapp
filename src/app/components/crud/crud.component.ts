import { Component, Input, OnInit } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenericFormService } from '../../services/generic-form.service';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export abstract class CrudComponent<T> implements OnInit {

  items: T[] = [];
  itemForm: FormGroup;
  editMode = false;
  currentItemId: number | null = null;

  constructor(
    private service: GenericService<T>,
    private fb: FormBuilder,
    private formService: GenericFormService
  ) {  
    this.itemForm = this.fb.group({  
      data: [''],  
    });  
  }  

  ngOnInit(): void {  
    // this.loadEntities();
    this.service.items$.subscribe((items) => {  
      this.items = items;  
    });  
  }  

  onSubmit() {  
    const data = this.itemForm.value.data;  
    if (this.editMode && this.currentItemId !== null) {  
      this.service.update(this.currentItemId, data);  
    } else {  
      this.service.create(data);  
    }  
    this.resetForm();  
  }  

  editItem(id: number, item: T) {  
    this.currentItemId = id;  
    // this.itemForm.setValue({ data: item.data });  
    this.editMode = true;  
  }  

  deleteItem(id: number) {  
    this.service.delete(id);  
  }  

  resetForm() {  
    this.itemForm.reset();  
    this.editMode = false;  
    this.currentItemId = null;  
  }  


  @Input() apiUrl!: string;
  @Input() displayedColumns!: string[];

  entities: T[] = [];
  selectedEntity?: T;
  isEditMode = false;


  // loadEntities(): void {
  //   this.service.getAll(this.apiUrl).subscribe({
  //     next: (value) => this.entities = value,
  //     error: console.log,
  //     complete: () => console.log('getAll function was completed succesfully..')
  //   })
  // }

  // selectEntity(entity: T): void {
  //   this.selectedEntity = { ...entity };
  //   this.isEditMode = true;
  // }

  // createEntity(entity: T): void {
  //   this.service.create(this.apiUrl, entity).subscribe({
  //     next: () => {
  //       this.loadEntities();
  //       this.reset();
  //     }
  //   })
  // }

  // updateEntity(entity: T, id: number): void {
  //   this.service.update(this.apiUrl, id, entity).subscribe({
  //     next: () => {
  //       this.loadEntities();
  //       this.reset();
  //     }
  //   })
  // }

  // deleteEntity(entity: T): void {
  //   this.service.delete(this.apiUrl, entity).subscribe({
  //     next: () => this.loadEntities()
  //   })
  // }

  // reset(): void {
  //   this.selectedEntity = undefined;
  //   this.isEditMode = false;
  // }

}
