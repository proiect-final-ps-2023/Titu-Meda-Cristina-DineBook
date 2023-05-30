import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { Manager } from 'src/app/models/manager.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ManagerService } from 'src/app/services/manager/manager.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  public restaurants!: Restaurant[];
  public managers!: Manager[];
  public name: string = "";
  public country: string = "";
  public city: string = "";
  closeResult?: string;
  editForm!: FormGroup;

  constructor(
    private restaurantService: RestaurantService,
    private managerService: ManagerService,
    private authService: AuthService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getRestaurants();
    this.editForm = this.formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      phoneNo: [''],
      country: [''],
      city: [''],
      address: [''],
      description: [''],
      menu: null,
      maxCustomersNo: [''],
      maxTablesNo: [''],
      managerId: ['']
    });
  }

  public async getRestaurants(): Promise<void> {
    const curUser = this.authService.getCurrentUser();
    if(curUser == null || curUser == undefined) {
      console.error("ManageComponent: Current user not found!");
      return;
    }
    const restaurants$ = this.restaurantService.getRestaurantsByManagerId(curUser.id);
    this.restaurants = await lastValueFrom(restaurants$);
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

  public async searchByCountryAndCity(country: string, city: string) {
    this.restaurants = [];
    if(country == "" && city == "") {
      this.getRestaurants();
    } else {
      const restaurants$ = this.restaurantService.getRestaurantsByCountryAndCity(country, city);
      this.restaurants = await lastValueFrom(restaurants$);
    }
  }

  public onEditRestaurant(targetModal:any, restaurant: Restaurant) {
    const curUser = this.authService.getCurrentUser();
    if(curUser == null || curUser == undefined) {
      console.error("ManageComponent: Current user not found!");
      return;
    }
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm?.patchValue( {
      id: restaurant.id,
      name: restaurant.name,
      email: restaurant.email,
      phoneNo: restaurant.phoneNo,
      country: restaurant.country,
      city: restaurant.city,
      address: restaurant.address,
      description: restaurant.description,
      menu: null,
      maxCustomersNo: restaurant.maxCustomersNo,
      maxTablesNo: restaurant.maxTablesNo,
      managerId: curUser.id
    });
  }

  public onUpdateRestaurant() {
    this.restaurantService.updateRestaurant(this.editForm?.getRawValue()).subscribe(
      (response: Restaurant) => {
        this.getRestaurants();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        alert(error.message);
      }
    );
  }
}
