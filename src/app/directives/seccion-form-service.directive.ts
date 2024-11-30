import { SeccionFormService } from '../services/seccion-form.service';

// @Directive({
//   selector: '[seccionFormServiceProvider]',
//   standalone: true
// })
// export class SeccionFormServiceDirective implements OnInit {

//   constructor(public formService: SeccionFormService) {}

//   // ngOnInit() {    }

// }
import { Directive, Inject, Optional } from '@angular/core';
import { GenericFormService } from '../services/generic-form.service';

@Directive({
  selector: '[seccionFormServiceProvider]',
  providers: [
    {
      provide: GenericFormService,
      useClass: SeccionFormService,
    },
  ],
  standalone: true
})
export class SeccionFormServiceDirective {
  constructor(@Optional() @Inject(GenericFormService) public formService: GenericFormService) {}

//   // ngOnInit() {    }

}
