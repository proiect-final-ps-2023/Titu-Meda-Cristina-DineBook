import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-nav-manager',
  templateUrl: './nav-manager.component.html',
  styleUrls: ['./nav-manager.component.css']
})
export class NavManagerComponent {
  constructor(private authService: AuthService) {}

  submit_logout(): void {
    this.authService.logout();
  }
}
