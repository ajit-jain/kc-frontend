import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private http: HttpClient) { }
  getContacts() {
    return this.http.get('./assets/default.json').pipe(
      catchError((res: Response) => {
        return throwError(res['error']);
      })
    );
  }
}
