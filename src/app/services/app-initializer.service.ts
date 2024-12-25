import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  load(): Observable<void> {
    console.log('Loading app configurations...');
    // setTimeout(() => console.log("already.."), 300000)
    return of();
  }
}
