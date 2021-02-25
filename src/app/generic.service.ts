import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'

import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class GenericService<T extends { id: any; }> {

  constructor(private http: HttpClient) { }

  public objectUrl: string = '';

  findOneById(id: number): Observable<any> {
    return this.http.get(environment.API_URL + this.objectUrl + '/' + id, { headers: httpOptions.headers }).pipe(
      catchError(() => throwError('Object not found'))
    )
  }

  public findAll(): Observable<T[]> {
    return this.http.get<T[]>(environment.API_URL + this.objectUrl + '/', { headers: httpOptions.headers }).pipe(
      catchError(() => throwError('Objects not found'))
    );
  }

  public create(object: T): Observable<any> {
    return this.http.post<T>(environment.API_URL + this.objectUrl + '/', object, { headers: httpOptions.headers }).pipe(
      catchError(() => throwError('Objects not found'))
    );
  }
  public update(object: T): Observable<any> {
    return this.http.patch<T>(environment.API_URL + this.objectUrl + '/' + object.id, object, { headers: httpOptions.headers }).pipe(
      catchError(() => throwError('Objects not found'))
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<T>(environment.API_URL + this.objectUrl + '/' + id, { headers: httpOptions.headers }).pipe(
      catchError(() => throwError('Objects not found'))
    );
  }

}
