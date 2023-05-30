import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseURL: string = 'http://localhost:8080/customers';

  constructor(private httpClient: HttpClient) { }

  public saveCustomer(customer: Customer): Observable<Customer> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.post<Customer>(this.baseURL, customer, {headers:header});
  }

  public updateCustomer(customer: Customer): Observable<Customer> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.put<Customer>(this.baseURL, customer, {headers:header});
  }

  public getCustomers(): Observable<Customer[]> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.get<Customer[]>(this.baseURL,{headers:header})
    .pipe(
      tap(_ => console.log('fetched customers')),
      catchError(this.handleError<Customer[]>('getCustomers', []))
    );
  }

  public getCustomersByFullName(name: string): Observable<Customer[]> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.get<Customer[]>(this.baseURL + '/name/' + name,{headers:header})
    .pipe(
      tap(_ => console.log('fetched customers')),
      catchError(this.handleError<Customer[]>('getCustomers', []))
    );
  }

  public getCustomer(id: String): Observable<Customer> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.get<Customer>(this.baseURL + '/' + id, {headers:header});
  }

  public deleteCustomer(id: String): Observable<void> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.delete<void>(this.baseURL + '/' + id, {headers:header});
  }

  public saveCustomersXML(customers: Customer[]): Observable<void> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.post<void>(this.baseURL + '/xml', customers, {headers:header});
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
