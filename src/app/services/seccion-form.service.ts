import { Injectable } from '@angular/core';
import { GenericFormService } from './generic-form.service';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SeccionFormService extends GenericFormService {

  constructor(fb: FormBuilder) {
    super(fb);
    this.formGroup = fb.group({ hi: 'hola'});
  }

}
