import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { Booking } from 'src/app/models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  baseURL: string = 'http://localhost:8080/bookings';

  constructor(private httpClient: HttpClient) {}

  public makeBooking(booking: Booking) {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.post<Booking>(this.baseURL, booking, {headers:header});
  }

  public getBookings(): Observable<Booking[]> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.get<Booking[]>(this.baseURL,{headers:header})
    .pipe(
      tap(_ => console.log('fetched bookings')),
      catchError(this.handleError<Booking[]>('getBookings', []))
    );
  }

  public getBookingsByCustomerId(customerId: string): Observable<Booking[]> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.get<Booking[]>(this.baseURL + '/customer/' + customerId,{headers:header})
    .pipe(
      tap(_ => console.log('fetched bookings')),
      catchError(this.handleError<Booking[]>('getBookings', []))
    );
  }

  public getBookingsByRestaurantId(restaurantId: string): Observable<Booking[]> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.get<Booking[]>(this.baseURL + '/restaurant/' + restaurantId,{headers:header})
    .pipe(
      tap(_ => console.log('fetched bookings')),
      catchError(this.handleError<Booking[]>('getBookings', []))
    );
  }

  public getBookingsByRestaurantName(restaurantName: string): Observable<Booking[]> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.get<Booking[]>(this.baseURL + '/restaurant/name/' + restaurantName,{headers:header})
    .pipe(
      tap(_ => console.log('fetched bookings')),
      catchError(this.handleError<Booking[]>('getBookings', []))
    );
  }

  public getBooking(id: String): Observable<Booking> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.get<Booking>(this.baseURL + '/' + id, {headers:header});
  }

  public deleteBooking(id: String): Observable<void> {
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
