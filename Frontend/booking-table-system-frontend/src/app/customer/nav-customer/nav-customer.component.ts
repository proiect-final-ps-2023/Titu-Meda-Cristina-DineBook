import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ScriptService } from 'src/app/services/script/script.service';

@Component({
  selector: 'app-nav-customer',
  templateUrl: './nav-customer.component.html',
  styleUrls: ['./nav-customer.component.css']
})
export class NavCustomerComponent {

  constructor(private authService: AuthService,
    private scriptService: ScriptService) {}

  ngOnInit(): void {
    this.scriptService.loadScript();
  }

  submit_logout(): void {
    this.authService.logout();
  }
}
