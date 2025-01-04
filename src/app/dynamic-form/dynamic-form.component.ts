import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  @Input() fields: DynamicFormField[] = [];
  // @Input() service!: GenericFormService;
  form!: FormGroup;

  constructor(private fb: FormBuilder, public formService: GenericFormService) {
    this.exampleForm = this.fb.group({  
      name: ['', Validators.required],  
      email: ['', [Validators.required, Validators.email]],  
      birthday: ['', Validators.required],  
      preferences: this.fb.group({  
        newsletter: [false],  
        notifications: [false],  
      }),  
    }); 
  }

  ngOnInit(): void {
    // this.form = this.fb.group({});
    // this.service ? this.form = this.service.formGroup : this.form = this.formService.formGroup;
    this.form = this.formService.formGroup;
    this.fields.forEach(field => {
      this.form.addControl(field.name, this.fb.control('', Validators.required));
    });
  }

  onSubmit() {
    console.log(this.form.value);
    
  }

  exampleForm: FormGroup;

  onSubmit2() {
    console.log(this.exampleForm.value);
  }

}
