import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  api = environment.API;
  headers;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
  getContacts() {
    return this.http.get('./assets/default.json').pipe(
      catchError((res: Response) => {
        return throwError(res['error']);
      })
    );
  }
  sendMessage(data) {
    return this.http.post(`${this.api}/message`, data, { headers: this.headers }).pipe(
      catchError((res: Response) => {
        return throwError(res['error']);
      })
    );
  }
  getMessages(pageNo, limit) {
    return this.http.get(`${this.api}/messages?page=${pageNo}&limit=${limit}`, { headers: this.headers }).pipe(
      catchError((res: Response) => {
        return throwError(res['error']);
      })
    );
  }
}
