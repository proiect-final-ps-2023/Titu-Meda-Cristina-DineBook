import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { Manager } from 'src/app/models/manager.model';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  baseURL: string = 'http://localhost:8080/managers';

  constructor(private httpClient: HttpClient) { }

  public saveManager(manager: Manager): Observable<Manager> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.post<Manager>(this.baseURL, manager, {headers:header});
  }

  public updateManager(manager: Manager): Observable<Manager> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.put<Manager>(this.baseURL, manager, {headers:header});
  }

  public getManagers(): Observable<Manager[]> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.get<Manager[]>(this.baseURL,{headers:header})
    .pipe(
      tap(_ => console.log('fetched managers')),
      catchError(this.handleError<Manager[]>('getManagers', []))
    );
  }

  public getManagersByFullName(name: string): Observable<Manager[]> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.get<Manager[]>(this.baseURL + '/name/' + name,{headers:header})
    .pipe(
      tap(_ => console.log('fetched managers')),
      catchError(this.handleError<Manager[]>('getManagers', []))
    );
  }

  public getManager(id: string): Observable<Manager> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.get<Manager>(this.baseURL + '/' + id, {headers:header});
  }

  public deleteManager(id: string): Observable<void> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.delete<void>(this.baseURL + '/' + id, {headers:header});
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
