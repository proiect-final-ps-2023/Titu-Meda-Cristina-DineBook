import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { NavAdminComponent } from './admin/nav-admin/nav-admin.component';
import { HomeCustomerComponent } from './customer/home-customer/home-customer.component';
import { NavCustomerComponent } from './customer/nav-customer/nav-customer.component';
import { HomeManagerComponent } from './manager/home-manager/home-manager.component';
import { NavManagerComponent } from './manager/nav-manager/nav-manager.component';
import { AuthService } from './services/auth/auth.service';
import { AdminService } from './services/admin/admin.service';
import { ManageAdminsComponent } from './admin/manage-admins/manage-admins.component';
import { ScriptService } from './services/script/script.service';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ManageCustomersComponent } from './admin/manage-customers/manage-customers.component';
import { CustomerService } from './services/customer/customer.service';
import { ManageManagersComponent } from './admin/manage-managers/manage-managers.component';
import { ManagerService } from './services/manager/manager.service';
import { ManageRestaurantsComponent } from './admin/manage-restaurants/manage-restaurants.component';
import { RestaurantService } from './services/restaurant/restaurant.service';
import { BookingService } from './services/booking/booking.service';
import { RestaurantsComponent } from './customer/restaurants/restaurants.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerBookingsComponent } from './customer/customer-bookings/customer-bookings.component';
import { ManageComponent } from './manager/manage/manage.component';
import { RestaurantBookingsComponent } from './manager/restaurant-bookings/restaurant-bookings.component';
import { FavouritesComponent } from './customer/favourites/favourites.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HomeAdminComponent,
    NavAdminComponent,
    HomeCustomerComponent,
    NavCustomerComponent,
    HomeManagerComponent,
    NavManagerComponent,
    ManageAdminsComponent,
    ManageCustomersComponent,
    ManageManagersComponent,
    ManageRestaurantsComponent,
    RestaurantsComponent,
    CustomerBookingsComponent,
    ManageComponent,
    RestaurantBookingsComponent,
    FavouritesComponent,
    ContactComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    RouterModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AdminService,
    CustomerService,
    ManagerService,
    RestaurantService,
    BookingService,
    ScriptService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
