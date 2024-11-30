import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
export abstract class GenericService<T> {
  private apiUrl: string = environment.apiUrl;
  private items: T[] = [];  
  private itemSubject = new BehaviorSubject<T[]>(this.items);  
  
  items$ = this.itemSubject.asObservable();  

  // addItem(data: T) {  
  //   const newItem: GenericItem<T> = { id: this.items.length + 1, data };  
  //   this.items.push(newItem);  
  //   this.itemSubject.next(this.items);  
  // }  

  // updateItem(id: number, data: T) {  
  //   const index = this.items.findIndex(item => item.id === id);  
  //   if (index !== -1) {  
  //     this.items[index].data = data;  
  //     this.itemSubject.next(this.items);  
  //   }  
  // }  


  constructor(private http: HttpClient) {
    this.apiUrl = '';
  }

  setApiUrl(url: string): void {
    this.apiUrl = url;
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<T[]>('getAll', []))
      );
  }

  get(id: number): Observable<T> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<T>(url)
      .pipe(
        catchError(this.handleError<T>(`get id=${id}`))
      );
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, item)
      .pipe(
        catchError(this.handleError<T>('create'))
      );
  }

  update(id: number, item: T): Observable<T> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<T>(url, item)
      .pipe(
        catchError(this.handleError<T>('update'))
      );
  }

  delete(id: number): Observable<T> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<T>(url)
      .pipe(
        catchError(this.handleError<T>('delete'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class GenericService<T> {

//   constructor(private http: HttpClient) { }

//   getAll(url: string): Observable<T[]> {
//     return this.http.get<T[]>(url);
//   }

//   getById(url: string, id: number): Observable<T> {
//     return this.http.get<T>(`${url}/${id}`);
//   }

//   create(url: string, entity: T): Observable<T> {
//     return this.http.post<T>(url, entity);
//   }

//   update(url: string, id: any, entity: T): Observable<T> {
//     return this.http.put<T>(`${url}/${id}`, entity);
//   }

//   delete(url: string, id: any): Observable<void> {
//     return this.http.delete<void>(`${url}/${id}`);
//   }

// }
