import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Restaurant } from 'src/app/models/restaurant.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit{
  public restaurants: Restaurant[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private authService: AuthService) {}

    ngOnInit(): void {
      this.getRestaurants();
    }

    public async getRestaurants(): Promise<void> {
      let user = this.authService.getCurrentUser();
      if(user == undefined || user == null) {
        console.error("getRestaurants: Customer id undefined");
        return;
      }
      const restaurants$ = this.restaurantService.getFavouritesRestaurants(user.id);
      this.restaurants = await lastValueFrom(restaurants$);
    }

    public async deleteFromFavourites(restaurant: Restaurant) {
      let user = this.authService.getCurrentUser();
      if(user == undefined || user == null) {
        console.error("getRestaurants: Customer id undefined");
        return;
      }
      await lastValueFrom(this.restaurantService.removeFromFavourites(restaurant.id, user.id));
      this.getRestaurants();
    }

}
