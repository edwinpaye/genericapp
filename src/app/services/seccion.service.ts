import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';

import { HttpClient } from '@angular/common/http';
import { Seccion } from '../models/seccion';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeccionService extends GenericService<Seccion> {

  constructor(http: HttpClient) {
    super(http);
    this.setApiUrl(environment.apiUrl);
  }

}
