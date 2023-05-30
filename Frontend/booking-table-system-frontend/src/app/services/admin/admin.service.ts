import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseURL: string = 'http://localhost:8080/admins';

  constructor(private httpClient: HttpClient) { }

  public saveAdmin(admin: Admin): Observable<Admin> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.post<Admin>(this.baseURL, admin, {headers:header});
  }

  public updateAdmin(admin: Admin): Observable<Admin> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.put<Admin>(this.baseURL, admin, {headers:header});
  }

  public getAdmins(): Observable<Admin[]> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.get<Admin[]>(this.baseURL,{headers:header})
    .pipe(
      tap(_ => console.log('fetched admins')),
      catchError(this.handleError<Admin[]>('getAdmins', []))
    );
  }

  public getAdminsbyFullName(name: string): Observable<Admin[]> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.get<Admin[]>(this.baseURL + '/name/' + name,{headers:header})
    .pipe(
      tap(_ => console.log('fetched admins')),
      catchError(this.handleError<Admin[]>('getAdmins', []))
    );
  }

  public getAdmin(id: String): Observable<Admin> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.get<Admin>(this.baseURL + '/' + id, {headers:header});
  }

  public deleteAdmin(id: String): Observable<void> {
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
