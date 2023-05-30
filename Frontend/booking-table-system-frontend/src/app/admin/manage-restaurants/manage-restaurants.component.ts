import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { Manager } from 'src/app/models/manager.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { ManagerService } from 'src/app/services/manager/manager.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-manage-restaurants',
  templateUrl: './manage-restaurants.component.html',
  styleUrls: ['./manage-restaurants.component.css']
})
export class ManageRestaurantsComponent implements OnInit {
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
    private modalService: NgbModal,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getRestaurants();
    this.getManagers();
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
      managerId: [''],
    });
  }

  public async getManagers(): Promise<void> {
    const managers$ = this.managerService.getManagers();
    this.managers = await lastValueFrom(managers$);
  }

  // public async getManagerUsername(managerId: string): Promise<string> {
  //   if(managerId == "" || managerId == undefined || managerId == null) {
  //     return "none";
  //   }

  //   const manager$ = this.managerService.getManager(managerId);
  //   const manager: Manager = await lastValueFrom(manager$);
  //   console.log(manager.username);
  //   return manager.username;
  // }

  public async getRestaurants(): Promise<void> {
    const restaurants$ = this.restaurantService.getRestaurants();
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

  public async onAddRestaurant({ value }: { value: Restaurant}): Promise<void> {
    const restaurant$ = this.restaurantService.saveRestaurant(value);
    const rest = await lastValueFrom(restaurant$);
    this.getRestaurants();
  }

  public onEditRestaurant(targetModal:any, restaurant: Restaurant) {
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
      managerId: restaurant.managerId,
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

  public onDeleteRestaurant(restaurantId: string): void {
    this.restaurantService.deleteRestaurant(restaurantId).subscribe(
      (response: void) => {
        this.getRestaurants();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public open(content: any) {
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
}
