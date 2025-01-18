import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicFormField } from './dynamicFormField';
import { CommonModule } from '@angular/common';
import { GenericFormService } from '../services/generic-form.service';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent implements OnInit {
  // @Input() fields: DynamicFormField[] = [];
  // // @Input() service!: GenericFormService;
  // form!: FormGroup;

  // constructor(private fb: FormBuilder, public formService: GenericFormService) {
  //   this.exampleForm = this.fb.group({  
  //     name: ['', Validators.required],  
  //     email: ['', [Validators.required, Validators.email]],  
  //     birthday: ['', Validators.required],  
  //     preferences: this.fb.group({  
  //       newsletter: [false],  
  //       notifications: [false],  
  //     }),  
  //   }); 
  // }

  // ngOnInit(): void {
  //   // this.form = this.fb.group({});
  //   // this.service ? this.form = this.service.formGroup : this.form = this.formService.formGroup;
  //   this.form = this.formService.formGroup;
  //   this.fields.forEach(field => {
  //     this.form.addControl(field.name, this.fb.control('', Validators.required));
  //   });
  // }

  // onSubmit() {
  //   console.log(this.form.value);
    
  // }

  // exampleForm: FormGroup;

  // onSubmit2() {
  //   console.log(this.exampleForm.value);
  // }

  form!: FormGroup;  

  constructor(private fb: FormBuilder) {  
    // this.form = this.fb.group({  
    //   items: this.fb.array([]),  
    // });  
  }  
  ngOnInit(): void {
    this.form = this.fb.group({  
      items: this.fb.array([]),  
    });  
  }

  get items(): FormArray {  
    return this.form.get('items') as FormArray;  
  }  

  addItem(): void {  
    this.items.push(this.fb.group({ id: Date.now(), name: '' }));  
  }  

  removeItem(index: number): void {  
    this.items.removeAt(index);  
  }  

  onDragStart(event: DragEvent, index: number): void {  
    event.dataTransfer?.setData('text/plain', index.toString());  
  }  

  onDrop(event: DragEvent): void {  
    const indexFrom = Number(event.dataTransfer?.getData('text/plain'));  
    const indexTo = this.getDropIndex(event);  
    if (indexFrom !== indexTo) {  
      this.moveItem(indexFrom, indexTo);  
    }  
  }  

  onDragOver(event: DragEvent): void {  
    event.preventDefault(); // Necessary to allow drop  
  }  

  getDropIndex(event: DragEvent): number {  
    const element = event.target as HTMLElement;  
    const itemsList = element.closest('.items-list');  
    const children = itemsList?.children;  
    if (children) {  
      for (let i = 0; i < children.length; i++) {  
        if (children[i] === element) {  
          return i;  
        }  
      }  
    }  
    return 0;  
  }  

  moveItem(fromIndex: number, toIndex: number): void {  
    const movedControl = this.items.at(fromIndex);  
    this.items.removeAt(fromIndex);  
    this.items.insert(toIndex > fromIndex ? toIndex - 1 : toIndex, movedControl);  
  } 

  onSubmit(): void {  
    console.log(this.form.value);  
  }
}
