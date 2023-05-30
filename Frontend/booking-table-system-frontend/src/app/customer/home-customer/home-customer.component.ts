import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.css']
})
export class HomeCustomerComponent implements OnInit {
  public customer?: Customer;

  constructor(
    private customerService: CustomerService,
    private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    console.log(JSON.stringify(user));
    if(user != null) {
      this.getCustomerById(user.id);
    }
  }

  public async getCustomerById(id: string) {
    const customer$ = this.customerService.getCustomer(id);
    this.customer = await lastValueFrom(customer$);
  }
}
