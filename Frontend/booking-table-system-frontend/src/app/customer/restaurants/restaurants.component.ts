import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { error } from 'jquery';
import { lastValueFrom } from 'rxjs';
import { Booking } from 'src/app/models/booking.model';
import { Customer } from 'src/app/models/customer.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BookingService } from 'src/app/services/booking/booking.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  public restaurants: Restaurant[] = [];
  public filteredRestaurants: Restaurant[] = [];
  public currentRestaurant!: Restaurant;
  name:string="";
  closeResult?: string;
  editForm!: FormGroup;

  constructor(
    private restaurantService: RestaurantService,
    private bookingService: BookingService,
    private authService: AuthService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getRestaurants();
    this.editForm = this.formBuilder.group({
      date: [''],
      time: [''],
      customersNo: [''],
      tablesNo: ['']
    });
  }
  
  public async getRestaurants(): Promise<void> {
    const restaurants$ = this.restaurantService.getRestaurants();
    this.restaurants = await lastValueFrom(restaurants$);
  }

  public async onAddBooking(f: NgForm): Promise<void> {
    let user = this.authService.getCurrentUser();
    if(user == undefined || user == null) {
      console.error("onAddBooking: Customer id undefined");
      return;
    }
    let customerId: string = user.id;
    let restaurantId: string = this.currentRestaurant.id;
    let dateTime: string = f.controls['date'].value + " " + f.controls['time'].value;
    let cNo: number = f.controls['customersNo'].value;
    let tNo: number = f.controls['tablesNo'].value;
    
    const b: any = {
      id: "",
      customerId: customerId,
      restaurantId: restaurantId,
      dateHour: dateTime,
      customersNo: cNo,
      tablesNo: tNo 
    }
    const booking: Booking = b as Booking;
    const restaurant$ = this.bookingService.makeBooking(booking);
    const rest = await lastValueFrom(restaurant$);
    this.getRestaurants();
  }

  public open(content: any, restaurant: Restaurant) {
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.currentRestaurant = restaurant;
  }
    
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public async searchByName(name: string) {
    this.restaurants = [];
    if(name == "") {
      this.getRestaurants();
    } else {
      const restaurants$ = this.restaurantService.getRestaurantByName(name);
      const restaurant = await lastValueFrom(restaurants$);
      this.restaurants.push(restaurant);
    }
  }

  public addToFavourites(restaurant: Restaurant) {
    let user = this.authService.getCurrentUser();
    if(user == undefined || user == null) {
      console.error("addToFavourite: Customer id undefined");
      return;
    }
    this.restaurantService.addToFavourites(restaurant.id, user.id).subscribe(
      (response: void) => {
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
