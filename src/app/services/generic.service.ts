import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map, take, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NotificationService } from './notification.service';

export interface ResponseBody<T> {
  ESTADO: string;
  MENSAJE: string;
  ENTITY: T;
}

export abstract class GenericService<T> {
  private apiUrl: string = environment.apiUrl;
  private items: T[] = [];
  private itemSubject = new BehaviorSubject<T[]>(this.items);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  items$ = this.itemSubject.asObservable();
  isLoading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient, private notificator: NotificationService) { }

  setApiUrl(url: string): void {
    this.apiUrl = url;
  }

  getCurrentItems(): T[] {
    return this.itemSubject.getValue();
  }

  getAll(subPath: string = '', options = {}): Observable<T[]> {
    this.loadingSubject.next(true);
    const url = this.apiUrl + subPath;
    console.log('loading data..');
    return this.http.get<ResponseBody<T[]>>(url, options)
      .pipe(
        tap(value => {
          console.log(value.ESTADO + ': ' + value.MENSAJE);
          this.itemSubject.next(value.ENTITY);
        }),
        catchError(this.handleError<ResponseBody<T[]>>('getAll', {ENTITY: [], ESTADO: "NOK", MENSAJE: "Error en la solicitud"})),
        map(res => res.ENTITY),
        take(1),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  get(subPath: string = '', options = {}): Observable<T> {
    // const url = `${this.apiUrl}/${id}`;
    const url = this.apiUrl + subPath;
    return this.http.get<ResponseBody<T>>(url, options)
      .pipe(
        tap(value => {
          console.log(value.ESTADO + ': ' + value.MENSAJE);
        }),
        catchError(this.handleError<ResponseBody<T>>('get')),
        map(res => res.ENTITY),
        take(1),
      );
  }

  getFromArray(subPath: string = '', options = {}): Observable<T> {
    // const url = `${this.apiUrl}/${id}`;
    const url = this.apiUrl + subPath;
    return this.http.get<ResponseBody<T[]>>(url, options)
      .pipe(
        tap(value => {
          console.log(value.ESTADO + ': ' + value.MENSAJE);
        }),
        catchError(this.handleError<ResponseBody<T[]>>('get')),
        map(res => res.ENTITY[0]),
        take(1),
      );
  }

  create(item: T, subPath: string = '', options = {}): Observable<T> {
    const url = this.apiUrl + subPath;
    return this.http.post<ResponseBody<T>>(url, item, options)
      .pipe(
        tap(value => {
          console.log(value.ESTADO + ': ' + value.MENSAJE);
          this.notificator.addNotification({
            type: 'success',
            message: 'Guardado Exitosamente!',
          });
        }),
        catchError(this.handleError<ResponseBody<T>>('create')),
        map(res => res.ENTITY),
        take(1),
      );
  }

  update(item: T, subPath: string = '', options = {}): Observable<T> {
    // const url = `${this.apiUrl}/${id}`;
    const url = this.apiUrl + subPath;
    return this.http.put<ResponseBody<T>>(url, item, options)
      .pipe(
        tap(value => {
          console.log(value.ESTADO + ': ' + value.MENSAJE);
          this.notificator.addNotification({
            type: 'success',
            message: 'Actualizado Exitosamente!',
          });
        }),
        catchError(this.handleError<ResponseBody<T>>('update')),
        map(res => res.ENTITY),
        take(1),
      );
  }

  delete(subPath: string = '', options = {}): Observable<T> {
    // const url = `${this.apiUrl}/${id}`;
    const url = this.apiUrl + subPath;
    return this.http.delete<ResponseBody<T>>(url, options)
      .pipe(
        tap(value => {
          console.log(value.ESTADO + ': ' + value.MENSAJE);
          this.notificator.addNotification({
            type: 'success',
            message: 'Eliminado Exitosamente!',
          });
        }),
        catchError(this.handleError<ResponseBody<T>>('delete')),
        // tap(value => sendInfoToServer(value)),
        map(res => res.ENTITY),
        take(1),
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      this.notificator.addNotification({
        type: 'error',
        message: `Error en la solicitud. (${error.message})`,
        ms: 7000,
      });
      return of(result as T);
    };
  }

}
