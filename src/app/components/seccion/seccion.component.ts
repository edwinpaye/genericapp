import { Component } from '@angular/core';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form.component';
import { SeccionFormServiceDirective } from '../../directives/seccion-form-service.directive';
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

}
