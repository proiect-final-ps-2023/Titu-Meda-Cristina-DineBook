import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { HomeCustomerComponent } from './customer/home-customer/home-customer.component';
import { HomeManagerComponent } from './manager/home-manager/home-manager.component';
import { ManageAdminsComponent } from './admin/manage-admins/manage-admins.component';
import { ManageCustomersComponent } from './admin/manage-customers/manage-customers.component';
import { ManageManagersComponent } from './admin/manage-managers/manage-managers.component';
import { ManageRestaurantsComponent } from './admin/manage-restaurants/manage-restaurants.component';
import { RestaurantsComponent } from './customer/restaurants/restaurants.component';
import { CustomerBookingsComponent } from './customer/customer-bookings/customer-bookings.component';
import { ManageComponent } from './manager/manage/manage.component';
import { RestaurantBookingsComponent } from './manager/restaurant-bookings/restaurant-bookings.component';
import { FavouritesComponent } from './customer/favourites/favourites.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent, pathMatch: 'full'},
  {path: 'admin', component: HomeAdminComponent, pathMatch: 'full'},
  {path: 'customer', component: HomeCustomerComponent, pathMatch: 'full'},
  {path: 'manager', component: HomeManagerComponent, pathMatch: 'full'},
  {path: 'admin/managed-admins', component: ManageAdminsComponent, pathMatch: 'full'},
  {path: 'admin/managed-customers', component: ManageCustomersComponent, pathMatch: 'full'},
  {path: 'admin/managed-managers', component: ManageManagersComponent, pathMatch: 'full'},
  {path: 'admin/managed-restaurants', component: ManageRestaurantsComponent, pathMatch: 'full'},
  {path: 'restaurants', component: RestaurantsComponent, pathMatch: 'full'},
  {path: 'customer/bookings', component: CustomerBookingsComponent, pathMatch: 'full'},
  {path: 'manager/manage-restaurants', component: ManageComponent, pathMatch: 'full'},
  {path: 'manager/manage-restaurant-bookings', component: RestaurantBookingsComponent, pathMatch: 'full'},
  {path: 'favourites', component: FavouritesComponent, pathMatch: 'full'},
  {path: 'contact', component: ContactComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
