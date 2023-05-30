import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { Booking } from 'src/app/models/booking.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BookingService } from 'src/app/services/booking/booking.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-customer-bookings',
  templateUrl: './customer-bookings.component.html',
  styleUrls: ['./customer-bookings.component.css']
})
export class CustomerBookingsComponent implements OnInit {
  public bookings!: Booking[];
  public restaurants!: any[];
  public currentBooking!: Booking;
  public currentRestaurant?: Restaurant;
  closeResult?: string;
  editForm!: FormGroup;

  constructor(
    private restaurantService: RestaurantService,
    private bookingService: BookingService,
    private authService: AuthService
    ) {}

  ngOnInit(): void {
    this.getBookings();
  }

  public getRestaurant(restaurantId: string): void {
    this.restaurantService.getRestaurant(restaurantId)
    .subscribe((response: Restaurant) => {
      const restaurant: Restaurant= {
        id: response.id,
        name: response.name,
        email: response.email,
        phoneNo: response.phoneNo,
        country: response.country,
        city: response.city,
        address: response.address,
        description: response.description,
        menu: response.menu,
        maxCustomersNo: response.maxCustomersNo,
        maxTablesNo: response.maxTablesNo,
        managerId: response.managerId,
      }
    });
  }

  public async getRestaurants(): Promise<void> {
    const restaurants$ = this.restaurantService.getRestaurants();
    this.restaurants = await lastValueFrom(restaurants$);
  }

  public async getBookings(): Promise<void> {
    const currentUser = this.authService.getCurrentUser();
    if(currentUser == null || currentUser == undefined) {
      console.error("CustomerBookingsComponent: getBookins(): no current user");
      return;
    }
    const bookings$ = this.bookingService.getBookingsByCustomerId(currentUser.id);
    this.bookings = await lastValueFrom(bookings$);
    this.bookings.forEach(booking => this.getRestaurant(booking.restaurantId));
  }

  public async cancelBooking(booking: Booking): Promise<void> {
     await lastValueFrom(this.bookingService.deleteBooking(booking.id));
     this.getBookings();
  }

}
