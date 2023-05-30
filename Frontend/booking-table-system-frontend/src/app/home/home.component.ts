import { Component } from '@angular/core';
import { Admin } from '../models/admin.model';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentUser?: Admin | null;

  constructor(//private authService: AuthService
    ) {
      //this.authService.user.subscribe(user => this.currentUser = user);
     }
}
