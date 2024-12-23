import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// @Injectable({
//   providedIn: 'root',
// })
export abstract class GenericFormService {
  private formConfig: any[] = [];
  public formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({});
  }

  initializeForm(config: any[]) {
    this.formConfig = config;
    this.buildForm();
  }

  private buildForm() {
    this.formConfig.forEach((field) => {
      const control = this.fb.control(field.value || ''); // Create a control with its default value
      this.formGroup.addControl(field.name, control);
    });
  }

  getFormValue() {
    return this.formGroup.value;
  }

  resetForm() {
    this.formGroup.reset();
  }

}
