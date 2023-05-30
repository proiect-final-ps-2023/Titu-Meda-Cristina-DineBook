import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantBookingsComponent } from './restaurant-bookings.component';

describe('RestaurantBookingsComponent', () => {
  let component: RestaurantBookingsComponent;
  let fixture: ComponentFixture<RestaurantBookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantBookingsComponent]
    });
    fixture = TestBed.createComponent(RestaurantBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
