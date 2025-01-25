import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';

import { HttpClient } from '@angular/common/http';
import { Seccion } from '../models/seccion';
import { environment } from '../../environments/environment';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class SeccionService extends GenericService<Seccion> {

  constructor(http: HttpClient, notificator: NotificationService) {
    super(http, notificator);
    this.setApiUrl(environment.apiUrl + "/seccion/v1");
  }

}
