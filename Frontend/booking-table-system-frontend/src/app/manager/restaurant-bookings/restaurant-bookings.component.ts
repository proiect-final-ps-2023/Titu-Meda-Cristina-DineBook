import { Component, NgIterable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Booking } from 'src/app/models/booking.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BookingService } from 'src/app/services/booking/booking.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant-bookings',
  templateUrl: './restaurant-bookings.component.html',
  styleUrls: ['./restaurant-bookings.component.css']
})
export class RestaurantBookingsComponent {
  public bookings!: Booking[];
  public restaurants!: any[];
  public restaurantName: string = "";
  closeResult?: string;
  editForm!: FormGroup;

  constructor(
    private restaurantService: RestaurantService,
    private bookingService: BookingService,
    private authService: AuthService
    ) {}

  ngOnInit(): void {
    this.getRestaurants();
  }

  public getRestaurants(): void {
    const curUser = this.authService.getCurrentUser();
    if(curUser == null || curUser == undefined) {
      console.error("ManageComponent: Current user not found!");
      return;
    }
    this.restaurantService.getRestaurantsByManagerId(curUser.id)
    .subscribe(response => {
      this.restaurants = response;
    });
  }

  public async searchBookingsByRestaurantName(name: string): Promise<void> {
    this.bookings = [];
    if(name != "") {
      const bookings$ = this.bookingService.getBookingsByRestaurantName(name);
      this.bookings = await lastValueFrom(bookings$);
    }
  }

  public async cancelBooking(booking: Booking): Promise<void> {
     await lastValueFrom(this.bookingService.deleteBooking(booking.id));
     this.searchBookingsByRestaurantName(this.restaurantName);
  }
}
