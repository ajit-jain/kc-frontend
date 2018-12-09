import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  api = environment.API;
  constructor(private http: HttpClient) { }
  getContacts() {
    return this.http.get('./assets/default.json').pipe(
      catchError((res: Response) => {
        return throwError(res['error']);
      })
    );
  }
  sendMessage(data) {
    return this.http.post(`${this.api}/message`, data).pipe(
      catchError((res: Response) => {
        return throwError(res['error']);
      })
    );
  }
  getMessages(pageNo, limit) {
    return this.http.get(`${this.api}/messages?page=${pageNo}&limit=${limit}`).pipe(
      catchError((res: Response) => {
        return throwError(res['error']);
      })
    );
  }
}
