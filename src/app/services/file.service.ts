import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {}

  getFile(url: string, payload: any): Observable<Blob> {
    return this.http.post(url, payload, { responseType: 'blob' });
  }

  getJsonWithBase64(url: string, payload: any): Observable<any> {
    return this.http.post(url, payload);
  }

  downloadFile(url: string, payload: any, filename: string): void {
    this.http.post(url, payload, { responseType: 'blob' }).subscribe({
      next: (response: Blob) => {
        this.saveFile(response, filename);
      },
      error: (error) => {
        console.error('File download error:', error);
      },
    });
  }

  private saveFile(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

}
