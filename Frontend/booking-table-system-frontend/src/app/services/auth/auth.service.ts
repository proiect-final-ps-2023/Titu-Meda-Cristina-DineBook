import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import decode from 'jwt-decode';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { Admin } from '../../models/admin.model';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authBaseURL: string = 'http://localhost:8080/auth';

  private userSubject: BehaviorSubject<Admin | null>;
  public user: Observable<Admin | null>

  constructor(private http: HttpClient, private router: Router) {
    let user = localStorage.getItem('currentUser');
    let body = JSON.stringify(user);
    this.userSubject = new BehaviorSubject<Admin | null>(
      JSON.parse(body)
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): Admin | null {
    return this.userSubject.value;
  }

  public login(form: FormGroup) {
    const body = form.getRawValue();
    const username = form.controls['username'].value; 
    const password = form.controls['password'].value; 

    this.http.post<string>(this.authBaseURL + '/login', body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      withCredentials: true
    }).subscribe((response:any) => {
      const token = response.token;
      console.log(token);
      localStorage.setItem('token', token);
      let tokenPayload: any = decode(token);
      const id = tokenPayload.id;
      console.log("id" + id);
      const fullName = tokenPayload.fullName;
      console.log("fullName: " + fullName);
      const email = tokenPayload.email;
      console.log("email" + email);
      const role = tokenPayload.role;
      console.log("role: " + role);
      const user: User = {
        id: id,
        username: username,
        password: password,
        fullName: fullName,
        email: email,
        phoneNo: '',
        country: '',
        city: ''
      }
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.userSubject.next(user);
      this.router.navigate(['/' + role]);
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
  }

  public register(form: FormGroup) {
    const body = form.getRawValue();
    const username = form.controls['username'].value;
    const password = form.controls['password'].value;
    
    return this.http.post<string>(this.authBaseURL + '/register', body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      withCredentials: true
    }).subscribe((response:any) => {
        const token = response.token;
        console.log(token);
        localStorage.setItem('token', token);
        let tokenPayload: any = decode(token);
        const id = tokenPayload.id;
        console.log("id" + id);
        const fullName = tokenPayload.fullName;
        console.log("fullName: " + fullName);
        const email = tokenPayload.email;
        console.log("email" + email);
        const role = tokenPayload.role;
        console.log("role: " + role);
        const user: User = {
          id: id,
          username: username,
          password: password,
          fullName: fullName,
          email: email,
          phoneNo: '',
          country: '',
          city: ''
        }
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', body);
        this.userSubject.next(user);
        this.router.navigate(['/' + role]);
        return user;
      });
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getCurrentUser(): User | null {
    const json = localStorage.getItem('currentUser');
    if(json != undefined && json != "") {
      let jsonObj = JSON.parse(json); // string to "any" object first
      let user = jsonObj as User;
      return user;
    }
    return null;
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    return (token != null) ? true:false;
  }
}
