import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Restaurant } from 'src/app/models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  baseURL: string = 'http://localhost:8080/restaurants';

  constructor(private httpClient: HttpClient) { }

  public saveRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.post<Restaurant>(this.baseURL, restaurant, {headers:header});
  }

  public updateRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.put<Restaurant>(this.baseURL, restaurant, {headers:header});
  }

  public getRestaurants(): Observable<Restaurant[]> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.get<Restaurant[]>(this.baseURL,{headers:header})
    .pipe(
      tap(_ => console.log('fetched admins')),
      catchError(this.handleError<Restaurant[]>('getAdmins', []))
    );
  }

  public getRestaurantsByManagerId(managerId: string): Observable<Restaurant[]> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.get<Restaurant[]>(this.baseURL + '/manager/' + managerId,{headers:header})
    .pipe(
      tap(_ => console.log('fetched restaurants')),
      catchError(this.handleError<Restaurant[]>('getRestaurantsByManagerId', []))
    );
  }

  public getRestaurantsByCountryAndCity(country: string, city: string): Observable<Restaurant[]> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.get<Restaurant[]>(this.baseURL + "/country/" + country + "/city/" + city,{headers:header})
    .pipe(
      tap(_ => console.log('fetched restaurants')),
      catchError(this.handleError<Restaurant[]>('getRestaurantsByCountryAndCity', []))
    );
  }

  public getRestaurant(id: String): Observable<Restaurant> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.get<Restaurant>(this.baseURL + '/' + id, {headers:header});
  }

  public getRestaurantByName(name: String): Observable<Restaurant> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.get<Restaurant>(this.baseURL + '/name/' + name, {headers:header});
  }

  public deleteRestaurant(id: String): Observable<void> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.delete<void>(this.baseURL + '/' + id, {headers:header});
  }

  public assignRestaurantManager(restaurantId: string, managerId: string) {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.put<void>(this.baseURL + '/' + restaurantId + "/manager/" + managerId, {headers:header});
  }

  public uploadMenu(restaurantId: string) {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.put<void>(this.baseURL + '/' + restaurantId, {headers:header});
  }

  public addToFavourites(restaurantId: string, customerId: string): Observable<void> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.post<void>(this.baseURL + '/customer/' + customerId + '/add-favourites/' + restaurantId, {headers:header});
  }

  public removeFromFavourites(restaurantId: string, customerId: string): Observable<void> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.delete<void>(this.baseURL + '/customer/' + customerId + '/remove-favourites/' + restaurantId, {headers:header});
  }

  public getFavouritesRestaurants(customerId: string): Observable<Restaurant[]> {
    let auth_token = localStorage.getItem("token");
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`);
    return this.httpClient.get<Restaurant[]>(this.baseURL + '/customer/' + customerId + '/favourites',{headers:header})
    .pipe(
      tap(_ => console.log('fetched restaurants')),
      catchError(this.handleError<Restaurant[]>('getFavouritesRestaurants', []))
    );
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
